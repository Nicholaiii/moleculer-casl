# moleculer-casl

[![npm version][npm-version-src]][npm-version-href]
[![jsr version][jsr-version-src]][jsr-version-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

CASL authorisation for Moleculer with service-provided ability definition and caching.

> **Note**:
> This module is heavily under development.

## Usage

### Ability provider

Add this mixin to your auth service, to provide rules for other services.

```ts
import { createCASLAbilityProvider } from 'moleculer-casl'

const AuthService = {
  mixins: [createCASLAbilityProvider(rulesFor)]
}
```

### Ability consumer

Add this mixin to any service that needs to use Abilities.

```ts
import { createCASLAbilityConsumer } from 'moleculer-casl'

const ProductService: Service & AbilityConsumerMethods = {
  mixins: [createCASLAbilityConsumer()],
  actions: {
    create(ctx) {
      const ability = await this.abilityFor(ctx.meta.user)
    }
  }
}
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [Nicholai Nissen](https://github.com/Nicholaiii)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/moleculer-casl?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/moleculer-casl
[jsr-version-src]: https://img.shields.io/jsr/v/@nicholai/moleculer-casl?style=flat&colorA=080f12&colorB=1fa669
[jsr-version-href]: https://jsr.io/@nicholai/moleculer-casl
[bundle-src]: https://img.shields.io/bundlephobia/minzip/moleculer-casl?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=moleculer-casl
[license-src]: https://img.shields.io/github/license/Nicholaiii/moleculer-casl.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/Nicholaiii/moleculer-casl/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/moleculer-casl
