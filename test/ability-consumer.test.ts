import { beforeAll, describe, expect, it } from 'vitest'
import type { Service, ServiceSchema } from 'moleculer'
import { ServiceBroker } from 'moleculer'

import { PureAbility } from '@casl/ability'
import { createCASLAbilityConsumer } from '../src/ability-consumer'
import { createCASLAbilityProvider } from '../src/ability-provider'
import type { AbilityConsumerMethods } from '../src/types'
import { rulesFor } from './rulesFor'

const broker = new ServiceBroker()

function createService(name: string, mixin: Partial<ServiceSchema>) {
  return broker.createService({
    name,
    mixins: [mixin],
  })
}

const providerName = 'provider'
createService(providerName, createCASLAbilityProvider(rulesFor))

describe('ability provider', () => {
  beforeAll(async () => {
    if (!broker.started)
      await broker.start()

    await broker.waitForServices('provider')
  })

  it('exported', () => {
    expect(createCASLAbilityConsumer).toBeDefined
  })

  it('returns a mixin', () => {
    const mixin = createCASLAbilityConsumer()

    expect(mixin).toBeDefined()
    expect(mixin).toHaveProperty('methods')
    expect(mixin.methods).toHaveProperty('ability')
  })

  it('allows calling the method as mixin', async () => {
    const mixin = createCASLAbilityConsumer(providerName)
    const name = 'consumer'

    const svc = createService(name, mixin) as Service & AbilityConsumerMethods

    await broker.waitForServices(name)

    const result = await svc.ability({ id: '123' })

    expect(result).toBeDefined()
  })

  it('parses rules and returns an ability', async () => {
    const mixin = createCASLAbilityConsumer(providerName)
    const result = await mixin.methods?.ability.bind({ broker })({ id: '123' })

    expect(result).toBeDefined()
    expect(result).instanceOf(PureAbility)
  })
})
