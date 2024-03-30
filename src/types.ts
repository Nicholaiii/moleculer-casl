import type { AnyMongoAbility, SubjectRawRule } from '@casl/ability'

export type DefaultUser = {
  id: string
}
export type AnyRules = SubjectRawRule<any, any, any>[]

export type AbilityConsumerMethods<
  TUser extends object = DefaultUser,
> = {
  abilityFor: (user: TUser) => Promise<AnyMongoAbility>
}
