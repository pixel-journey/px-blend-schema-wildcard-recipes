# Blend slots: schema wildcards vs exact templates

> **Domain:** blend recipe slots (schema wildcard)  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** `templateId: -1` accepts **any** template under a named **schema**. Exact slots bind **first** so wildcards cannot steal a concrete match.

**Code under test:** `npm test`. Pure matching — no mint/burn, no live reads.

**Official:** [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract). **Sibling:** [simple NFT blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Exact-first bind, refusals |
| [TIPS.md](TIPS.md) | UX and caps |
| [SECURITY.md](SECURITY.md) | Ownership and steal |
| [SOURCES.md](SOURCES.md) | Official + related |

## What is true (executed)

| Rule | Result |
|------|--------|
| Exact slots | Multiset match on template + schema |
| Wildcard `-1` | Any template under the slot schema |
| Bind order | Exact before wildcards |
| Wrong schema / empty / duplicates / non-owner | Refused |

```bash
npm test
```

MIT — Pixel Journey
