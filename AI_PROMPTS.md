# AI handoff — schema wildcard blend match

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
# https://github.com/atomicassets/atomic-knowledge — pin commit, AGENTS.md
```

| Tool | Role |
| --- | --- |
| [atomic-knowledge](https://github.com/atomicassets/atomic-knowledge) | Network, mint order |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Templates / schemas |
| [WAX blend tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/blend_nft) | Craft after match |
| [simple blend](https://github.com/pixel-journey/px-blend-simple-nft-to-nft) | Burn/mint after match |

## Non-negotiables

1. `template_id == -1` means **any template in the named schema**, not any NFT and not template 0.
2. Matching is **two-pass**: exact slots fill **before** wildcards. Left-to-right single pass fails the curriculum test.
3. `MAX_SLOTS` is **20**.
4. This lab returns matched asset ids only. It does **not** build burn/mint — hand ids to simple blend.
5. Mint target is always a **real** template id, never `-1`.
6. Collection scope is not enforced here; production loads collection from the asset row.
7. Match algorithm ports; collection/template ids and ABI version are chain-local.

## Prompt seeds

- "Exact slot and wildcard both could take asset A — which wins?"
- "Show why a single left-to-right pass fails the two-pass test."
- "Refuse minting template_id -1 as the output."
- "Wire matched ids into simple blend without merging the products."

## Do not

- Treat memo as auth.
- Merge this with hybrid FT rules.
- Claim a live blend from this pure matcher.
