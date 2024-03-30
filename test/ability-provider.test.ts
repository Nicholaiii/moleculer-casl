import { beforeAll, describe, expect, it } from 'vitest'

import type { ServiceSchema } from 'moleculer'
import { ServiceBroker } from 'moleculer'
import { createCASLAbilityProvider } from '../src'

import { rulesFor } from './rulesFor'

const broker = new ServiceBroker()
function createService(name: string, mixin: Partial<ServiceSchema>) {
  return broker.createService({
    name,
    mixins: [mixin],
  })
}

describe('ability provider', () => {
  beforeAll(async () => {
    if (!broker.started)
      await broker.start()
  })

  it('exported', () => {
    expect(createCASLAbilityProvider).toBeDefined
  })

  it('returns a mixin', () => {
    const mixin = createCASLAbilityProvider(rulesFor)

    expect(mixin).toBeDefined()
    expect(mixin).toHaveProperty('actions')
    expect(mixin.actions).toHaveProperty('ability')
  })

  it('allows calling the ability action', async () => {
    const mixin = createCASLAbilityProvider(rulesFor)
    const name = 'call-ability'

    createService(name, mixin)

    await broker.waitForServices(name)
    const result = await broker.call<any[], any>('call-ability.ability', { id: 123 })
    expect(result).toBeDefined()
    expect(result[0]).toHaveProperty('conditions', { user: 123 })
  })
})
