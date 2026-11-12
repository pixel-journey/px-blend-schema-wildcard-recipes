# px-blend-schema-wildcard-recipes

> **Trust:** private educational lab (Tier B)  
> **Domain:** blend recipe slots (schema wildcard)  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** A recipe slot with **`templateId: -1`** accepts **any** template under a named **schema**. Exact slots (`templateId >= 1`) still require an exact id. Exact slots bind first.

Different from [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) (exact template multisets only).

Official AtomicAssets: [contract](https://github.com/pinknetworkx/atomicassets-contract). WAX: [How-To](https://docs.wax.io/build/tutorials/howto_atomicassets).

**Real code:** `npm test` (10 tests). **Not** wasm, **not** mint/burn, **no** live AtomicAssets read.

## What is true (executed)

| Rule | Result |
|------|--------|
| Exact slots | Multiset match on template + schema |
| Wildcard `-1` | Any template under the slot schema |
| Bind order | Exact slots consume assets before wildcards |
| Wrong schema / empty / duplicates / non-owner / id 0 / >20 | Refused |

```bash
npm test
```

## Related

- [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft)
- [px-blend-hybrid-ft-plus-nft](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft)

## License

MIT — Pixel Journey
