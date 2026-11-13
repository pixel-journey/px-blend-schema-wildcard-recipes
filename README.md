# Blend slots: schema wildcards vs exact templates

> **Domain:** blend recipe slots (schema wildcard)  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** A recipe slot with **`templateId: -1`** accepts **any** template under a named **schema**. Exact slots (`templateId >= 1`) still require an exact id. Exact slots bind first so wildcards cannot steal a concrete match.

Different from [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft), which matches exact template multisets only.

**Official AtomicAssets:** [contract](https://github.com/pinknetworkx/atomicassets-contract). **WAX:** [How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets).

**Code under test:** `npm test` (10 tests). Pure matching lab — no wasm, no mint/burn, no live AtomicAssets read.

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

MIT — Pixel Journey
