# Security notes

| Issue | Lab mitigation |
|-------|----------------|
| Wildcard as “any collection NFT” | Schema is required; wrong schema fails match |
| Wildcard consuming the exact template needed later | Exact slots bind first |
| Client-supplied schema on the offer | Production must take schema from chain template/asset rows |
| Open-ended batch size | `MAX_SLOTS` 20 |

Production still needs the rest of craft (minter, burnable, supply) from the exact-template lab.
