import type { AnyMongoAbility, SubjectRawRule } from '@casl/ability'

/**
 * Sensible default information for a user. In reality you will likely have your own requirements.
 */
export type DefaultUser = {
  id: string
}
/**
 * The module doesn't care what rules you use, as long as you use any.
 */
export type AnyRules = SubjectRawRule<any, any, any>[]

/**
 * Use this to augment your Service types, so the main function of mixin has types.
 */
export type AbilityConsumerMethods<
  TUser extends object = DefaultUser,
> = {
  abilityFor: (user: TUser) => Promise<AnyMongoAbility>
}
