import { beforeAll, describe, expect, it } from 'vitest'
import type { Service, ServiceSchema } from 'moleculer'
import { ServiceBroker } from 'moleculer'

import { createCASLAbilityConsumer } from '../src/ability-consumer'
import { createCASLAbilityProvider } from '../src/ability-provider'
import type { AbilityConsumerMethods } from '../src/types'
import { rulesFor } from './rulesFor'

const broker = new ServiceBroker()

class Post {
  constructor(public user: string) {}
}

function createService(name: string, mixin: Partial<ServiceSchema>, other?: Partial<ServiceSchema>) {
  return broker.createService({
    name,
    mixins: [mixin],
    ...(other ?? {}),
  })
}

const providerName = 'provider'
const _provider = createService(providerName, createCASLAbilityProvider(rulesFor))
const consumerName = 'consumer'
const _consumer = createService(consumerName, createCASLAbilityConsumer(providerName), {
  actions: {
    foo: {
      params: {
        user: {
          $$type: 'object',
          id: 'string',
        },
      },
      async handler(this: Service & AbilityConsumerMethods, ctx) {
        const ability = await this.abilityFor(ctx.params.user)
        const post = new Post(ctx.params.user.id)
        const otherPost = new Post('foo')
        return [
          ability.can('read', post),
          ability.can('read', otherPost),
        ]
      },
    },
  },
})

describe('moleculer-casl', () => {
  beforeAll(async () => {
    if (!broker.started)
      await broker.start()

    await broker.waitForServices([providerName, consumerName])
  })

  it('correctly parses abilities', async () => {
    const result: any[] = await broker.call(`${consumerName}.foo`, { user: { id: '123' } })
    expect(result[0]).toBe(true)
    expect(result[1]).toBe(false)
  })
})
