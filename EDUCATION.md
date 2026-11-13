# Education — schema wildcard recipe slots

> **Rung:** `npm test` passes. Matching only — no mint/burn.  
> Sibling exact-only gate: [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft).

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | `templateId: -1` means any template under a schema |
| Intermediate | Exact slots bind before wildcards |
| Masterclass | Why bind order prevents wildcards from stealing concrete matches |

## Beginner

Recipe slots:

- `templateId >= 1` — exact template under the given schema
- `templateId === -1` — **any** template under that schema

Offers must be owned by the caller; one asset per id; counts must match.

## Intermediate

Algorithm: assign **exact** slots first, then fill wildcards from remaining offers. That way a concrete template cannot be consumed by an earlier wildcard greedily in a bad order.

## Masterclass

Wildcards increase player flexibility and **grief surface** (wrong schema assets). Still require chain-sourced ownership in production (simple blend pattern). Max 20 slots in this lab.

## Will not teach

Live AtomicAssets reads, mint/burn bodies, or FT rails (see hybrid blend).
