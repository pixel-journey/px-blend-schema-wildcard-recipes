# Worked examples — wildcard matching

## Example A — mixed recipe

Slots: exact template `10` schema `cards`, wildcard `-1` schema `cards`.

Offers: asset A template 10, asset B template 99, both schema `cards`, owned by caller.

Exact binds A first; wildcard takes B. Result: `[A.id, B.id]` in slot order.

## Example B — wildcard cannot steal exact

If both offers could satisfy a wildcard, exact still claims the matching template id first.

## Example C — wrong schema

Wildcard needs schema `cards`; offer is `weapons` → `slot unmatched`.

## Example D — refusals

| Case | Error |
| --- | --- |
| Empty recipe | empty recipe |
| Slot/offer count mismatch | ingredient count mismatch |
| Duplicate asset id | duplicate asset |
| Non-owner | not owner of ingredient |
| templateId 0 | bad template id |
| >20 slots | bad asset batch |
