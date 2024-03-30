import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import type { DefaultUser } from '../src/types'

export function rulesFor(user: DefaultUser) {
  const { can, rules } = new AbilityBuilder(createMongoAbility)
  can('read', 'Post', { user: user.id })
  return rules
}
