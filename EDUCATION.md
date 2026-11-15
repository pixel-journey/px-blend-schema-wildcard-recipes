# Education — schema wildcard recipe slots

> **Rung:** `npm test` passes (10 tests). Matching only. No mint, no burn, no chain read.  
> Sibling that burns and mints: [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft).

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

## Masterclass (not in this repo)

- Loading template and schema from the AtomicAssets asset row instead of trusting the offer object.
- `require_auth(caller)` and collection editor rights for the mint.
- Burning or transferring the consumed ids, then minting the output. That sequence is the simple and hybrid blend labs.
- A wildcard that also constrains immutable data (rarity, season). This matcher only sees template id and schema name.

## Outcomes

1. State what `-1` means, and what `0` means (invalid).
2. Show exact-before-wildcard on a bag that contains both the exact template and another card.
3. Show that the same template id on the wrong schema still fails.
4. Explain why offer order and slot order are different arrays.
5. Point at the simple blend lab for everything after the match.
