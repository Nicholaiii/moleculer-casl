import type { ServiceSchema } from 'moleculer'
import { createMongoAbility } from '@casl/ability'
import type { ExtractSubjectType, MongoQuery, Subject, SubjectRawRule } from '@casl/ability'
import type { AbilityConsumerMethods, AnyRules, DefaultUser } from './types'

export function createCASLAbilityConsumer<
  TUser extends object = DefaultUser,
  TRules extends SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery>[] = AnyRules,
>(service = 'auth'): Partial<ServiceSchema & { methods: AbilityConsumerMethods<TUser> }> {
  return {
    methods: {
      async abilityFor(user: TUser) {
        const rules: TRules = await this.broker.call<TRules, TUser>(`${service}.ability`, user)
        return createMongoAbility(rules)
      },
    },
  }
}
