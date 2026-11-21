# Security — schema wildcard match

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-owner offer | refused |
| Duplicate asset id | refused |
| Slot count ≠ offer count (incl. empty) | refused |
| Template id `0` | refused (only `-1` or `≥ 1`) |
| More than **20** slots | refused |
| Exact template eaten by an earlier wildcard | prevented by **exact-before-wildcard** bind order |
| Right template, wrong schema | refused |

## Bind order (critical)

```text
1. Exact template slots first
2. Wildcard (-1) slots second
```

A greedy one-pass lets a wildcard consume the only hero card; the exact slot then fails or accepts a common. Two-pass is the patch.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Offer objects | Caller can claim an id they do not hold — [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) requires chain rows |
| Auth | Real `require_auth(caller)` |
| Schema membership | Template must actually belong to that schema on chain |
| Mint / supply | No mint here — no output-supply or authorized_minter test |
| Collection scope | This matcher cannot tell two collections' template ids apart |

## Attack angles

1. **Greedy one-pass** — wildcard takes the only hero card.  
2. Duplicate ids filling two slots.  
3. Trusting offer schema/template without reading the asset row.  
4. Using `-1` as the **mint** template id (output must be a real template).  
5. Stopping at match and calling craft complete (still need burns/mint).

## Honesty limits

Matching only. No burn, no mint, no AtomicAssets RPC.

| Sibling | Distinction |
| --- | --- |
| [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | Burns before mint, desk consume |
| [hybrid FT+NFT](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | Token + NFT inputs |

[atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets).
