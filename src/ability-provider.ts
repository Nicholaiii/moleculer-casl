import type { Context, ServiceSchema } from 'moleculer'
import type { AnyRules, DefaultUser } from './types'

export function createCASLAbilityProvider<
  TUser extends object = DefaultUser,
  TMeta extends object = object,
>(
  rulesFor: (user: TUser) => AnyRules,
  /* TODO: Add validator */
): Partial<ServiceSchema> {
  return {
    actions: {
      ability: {
        handler(ctx: Context<TUser, TMeta>) {
          return rulesFor(ctx.params)
        },
      },
    },
  }
}
