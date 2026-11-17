# Education — schema wildcard recipe slots

> **Rung:** `npm test` passes (10 tests). Matching only. No mint, no burn, no chain read.  
> Sibling that burns and mints: [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft).

Official: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [blend tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/blend_nft).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | State what `-1` means, and what `0` means (invalid) |
| Intermediate | Exact-before-wildcard on a bag that holds both |
| Masterclass | Offer order vs slot order; hand-off to burn/mint |

---

## Beginner

A blend recipe is a list of slots. Each slot names a schema and a template:

| `templateId` | Meaning |
| --- | --- |
| `>= 1` | That template, and it must also sit on the slot's schema |
| `-1` | Any template on that schema |
| `0` or any other integer | Refused (`bad template id`) |

The player offers one asset per slot. Counts must be equal. Every offer must be owned by the caller. The same asset id cannot fill two slots.

Returned value: asset ids in **slot order**, not offer order.

## Intermediate — two passes

`matchSlots` does not walk slots from left to right greedily.

1. Bind every exact slot (`templateId !== -1`). An asset matches only when **both** template id and schema match.
2. Bind every wildcard (`-1`) from whatever is left, schema only.

That order is the whole lesson. If a wildcard ran first, it could consume the only copy of template 50 and then the exact slot would fail even though the bag was valid.

Offers are scanned from the front of the array. The first unused offer that fits a slot wins. Two exact slots for template 10 therefore take offers in the order they appear, and the result is rewritten into slot order.

Caps: `MAX_SLOTS` is 20. Asset ids are uint64 (`1` .. `2^64-1`). Schema and account names are `a-z1-5.` length 1..12, not starting or ending with `.`.

## Masterclass

### What is still outside this repo

- Loading template and schema from the AtomicAssets asset row instead of trusting the offer object.
- `require_auth(caller)` and collection editor rights for the mint.
- Burning or transferring the consumed ids, then minting the output — [simple](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) and [hybrid](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft).
- A wildcard that also constrains immutable data (rarity, season). This matcher only sees template id and schema name.

### Common mistakes

1. One-pass matching that assigns the only copy of template 7 to a wildcard, then fails the exact slot.  
2. Treating `-1` as template zero or as "missing."  
3. Duplicate asset ids in the bag.  
4. Forgetting the mint target is a real template id, not `-1`.  
5. Skipping the FT leg when the recipe is hybrid.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Collection-scoped schema | Reject assets from other collections |
| Odds on output | RNG after ingredients lock |
| Partial refund of unused bag | Explicit, tested |

### Exercises

1. Recipe: exact template 50 + wildcard same schema. Bag: one 50 and one other. Who fills the exact slot?  
2. Is template id `0` valid? (No.)  
3. Does this lab burn assets? (No — matching only.)  
4. After match, which lab builds burn/mint bodies?

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [TIPS](TIPS.md) · [SECURITY](SECURITY.md).
