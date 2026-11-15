# Security

## Closed by tests

- Non-owner offer.
- Duplicate asset id used twice.
- Slot count not equal to offer count, including the empty recipe.
- Template id `0` (only `-1` or `>= 1`).
- More than 20 slots.
- Exact template consumed by an earlier wildcard (bind order).
- Right template, wrong schema.

## Not closed

- Offers are plain objects. A caller can claim an asset id they do not hold on chain. The simple blend lab is where chain rows are required.
- No `require_auth`.
- No check that the template actually belongs to that schema on chain.
- No mint, so there is no output-supply or `authorized_minter` test.
- Owner strings are compared, not permissions. `alice@active` is not modeled.

## Attack

Recipe: one exact “hero” card and one “any common.” A greedy matcher lets the wildcard take the hero, then rejects the craft or, worse, accepts a second common as the hero. Players burn the wrong NFT. The two-pass test is the patch.
