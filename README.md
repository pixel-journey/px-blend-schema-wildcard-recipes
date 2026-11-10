# px-blend-schema-wildcard-recipes

> **Trust:** private educational lab (Tier B)
> **Quest:** 048 — schema-wildcard blend ingredient slots
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**One-sentence goal:** A recipe slot with **`templateId: -1`** accepts **any** template under a named **schema**. Exact slots (`templateId >= 1`) still require an exact id. Exact slots bind first.

Different from [px-blend-simple-nft-to-nft](https://github.com/pixel-journey/px-blend-simple-nft-to-nft), which only does exact template multisets.

**Real code:** `npm test` (10 tests). **Not** wasm, **not** mint/burn, **no** live AtomicAssets read.

---

## What is true (executed)

| Rule | Result |
|------|--------|
| Exact slots | Multiset match on template + schema |
| Wildcard `-1` | Any template under the slot schema |
| Bind order | Exact slots consume assets before wildcards |
| Wrong schema | Unmatched (exact or wildcard) |
| Empty / count / duplicate / non-owner | Refused |
| `templateId` 0 | Refused |
| > 20 slots | Refused |

```bash
npm test
```

---

## Layout

| Path | Role |
|------|------|
| `invariants/wildcard.ts` | `matchSlots` |
| `invariants/wildcard.test.ts` | Executed claims |
| `EDUCATION.md` | Why `-1` is not “any NFT in the collection” |
| `SECURITY.md` | Over-broad wildcard surface |

## License

MIT — Pixel Journey

---

*Seeded 2026-11-10. Matching only. No wasm.*
