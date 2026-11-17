# Security — schema wildcard match

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Non-owner offer | refused |
| Duplicate asset id | refused |
| Slot count ≠ offer count (incl. empty) | refused |
| Template id `0` | refused (only `-1` or `>= 1`) |
| More than 20 slots | refused |
| Exact template eaten by an earlier wildcard | prevented by **exact-before-wildcard** bind order |
| Right template, wrong schema | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Offer objects | Caller can claim an id they do not hold — [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) requires chain rows |
| Auth | Real `require_auth(caller)` |
| Schema membership | Template must actually belong to that schema on chain |
| Mint / supply | No mint here — no output-supply or authorized_minter test |
| Permissions | Owner strings, not `alice@active` |
| Collection scope | This matcher cannot tell two collections' template ids apart |

## Attack angles

1. **Greedy one-pass** — wildcard takes the only hero card; exact slot fails or a common is accepted as hero. Players burn the wrong NFT. **Two-pass** (exact slots first) is the patch.
2. Duplicate ids filling two slots.
3. Trusting offer schema/template without reading the asset row.
4. Using `-1` as the **mint** template id (output must be a real template).
5. Stopping at match and calling craft complete (still need burns/mint from the simple blend lab).

## Honesty limits

Matching only. No burn, no mint, no AtomicAssets RPC. Related: [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) · [hybrid](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) · [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract).
