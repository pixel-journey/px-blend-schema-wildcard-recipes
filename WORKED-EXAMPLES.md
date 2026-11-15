# Worked examples

Numbers are the assertions in `invariants/wildcard.test.ts`. Caller is `alice`. Schema `pixsch` unless noted.

## Exact multiset, result in slot order

Slots: template 10, template 10, template 20.

Offers, in this order: asset `1` template 10, asset `2` template 20, asset `3` template 10.

```text
matchSlots → [1n, 3n, 2n]
```

Slot 0 takes the first template-10 offer (`1`). Slot 1 takes the next (`3`). Slot 2 takes template 20 (`2`). Offer order was `1, 2, 3`. Slot order is not.

An exact slot for template 10 offered only template 99 throws `slot unmatched`.

## Wildcard does not steal the exact card

Slots: wildcard on `pixsch`, then exact template `50` on `pixsch`.

Offers: asset `1` template 50, asset `2` template 99.

```text
matchSlots → [2n, 1n]
```

Pass 1 assigns slot 1 (exact) to asset `1`. Pass 2 assigns the wildcard to asset `2`. If the wildcard had run first it would have been allowed to take asset `1`, and the exact slot would have nothing left. The test locks the safe order.

Two wildcards and offers `5` (template 100) and `6` (template 200) return both ids. Order between two wildcards follows first-unused offer.

## Schema is part of the match

| Slot | Offer | Result |
| --- | --- | --- |
| `-1` / `pixsch` | template 10 / `othersch` | `slot unmatched` |
| template `10` / `pixsch` | template 10 / `othersch` | `slot unmatched` |

A matching template id on the wrong schema is not a match.

## Refusals

| Case | Error |
| --- | --- |
| `matchSlots([], [], alice)` | empty recipe |
| One slot, zero offers | ingredient count mismatch |
| Two slots, both offers asset id `1` | duplicate asset |
| Offer owned by `bob`, caller `alice` | not owner of ingredient |
| Slot `templateId: 0` | bad template id |
| 21 slots | bad asset batch |
