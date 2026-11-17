# Tips — schema wildcard blend slots

`template_id == -1` means **any template in the named schema**, not "any NFT." Exact slots fill before wildcards (two-pass). A left-to-right single pass is a different algorithm and fails `fills exact slots before wildcards`.

## Do

- Write the UX as "any template in schema pixsch," not as the sentinel `-1`.
- After this function returns ids, hand them to the [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) burn-or-treasury then mint sequence. This file does not build those actions.
- Keep `MAX_SLOTS` (20) aligned with the simple blend ingredient cap if they share one craft.
- Load **collection** from the asset row in production. This lab cannot tell two collections' template ids apart.

## Don't

- Treat `-1` as template zero or as "missing."
- Let a wildcard consume an asset an exact slot still needed.
- Assume schema names use the invariant-kit charset. This lab allows `.`.

## Common mistakes

1. One-pass matching that assigns the only copy of template 7 to a wildcard, then fails the exact slot.
2. Duplicate asset ids in the bag.
3. Forgetting the mint target is a real template id, not `-1`.
4. Skipping the FT leg when the recipe is hybrid. That is [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft).

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Collection-scoped schema | Reject assets from other collections |
| Odds on output | Separate RNG lab after ingredients lock |
| Partial refund of unused bag | Explicit, tested |

Official: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [blend tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/blend_nft).
