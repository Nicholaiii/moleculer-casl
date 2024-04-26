import type { Context, ServiceSchema } from 'moleculer'
import type { AnyRules, DefaultUser } from './types'

/**
 * Creates a mixin that adds an action to provide CASL rules for other services to query.
 *
 * @param rulesFor A function that takes your desired entity and returns raw CASL rules.
 * @returns Mixin
 */
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
