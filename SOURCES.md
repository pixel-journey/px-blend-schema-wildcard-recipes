# Sources

## Official

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Templates, schemas, assets |
| [WAX How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Overview |
| [Blend tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/blend_nft) | Craft pattern after match |
| [Minting NFTs](https://docs.wax.io/build/tutorials/howto_atomicassets/mint_nft) | After match: mint a **real** template id |
| [docs.wax.io](https://docs.wax.io/) | Network docs |

## Product facts locked by this lab

- `template_id == -1` means **any template in the named schema**, not "any NFT" and not template zero.
- Matching is **two-pass**: exact slots fill **before** wildcards. A left-to-right single pass is a different algorithm and fails the curriculum test.
- `MAX_SLOTS` is **20**, aligned with the simple blend ingredient cap when they share one craft.
- This file returns matched asset ids only. It does **not** build burn, treasury, or mint actions — hand the ids to [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft).
- The mint target is always a real template id, never `-1`.
- Schema names in this lab allow `.`. Do not merge with [invariant-kit](https://github.com/pixel-journey/px-invariant-kit) name rules without a test.
- Collection scope is not enforced here. Production must load collection from the asset row.

## Related labs

| Repo | Role |
| --- | --- |
| [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | Exact multiset + burn/mint intents |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | FT + NFT craft |
| [memo router](https://github.com/pixel-journey/px-memo-action-router) | `blend:` memos |
| [ATOMICASSETS-V2.md](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ATOMICASSETS-V2.md) | v2 notes |
| [learning path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/LEARNING-PATH.md) | Curriculum order |
