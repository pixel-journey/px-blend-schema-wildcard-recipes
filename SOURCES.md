# Official sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Schemas, templates, assets |
| [WAX: How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Standard overview |
| [WAX API reference](https://docs.wax.io/build/api-reference/) | Schema / template reads |

Wildcard `templateId: -1` is a **recipe convention in this lab**, not an AtomicAssets primitive. Schema still comes from the collection's schema table in production.

## Domain map

| Repo | Role |
| --- | --- |
| [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | Exact template multiset |
| [px-blend-hybrid-ft-plus-nft](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | FT + NFT craft |
| **This repo** | Exact vs schema-wildcard slots; exact binds first |
