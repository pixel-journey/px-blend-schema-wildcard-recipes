# Education

## The pitfall

Exact-template recipes are easy to reason about and easy to exhaust. Games often want “any Pixal of schema X” without listing every template id. Encoding that as “any asset in the collection” is too wide: wrong schemas and unrelated templates slip in.

## The rule

1. `templateId >= 1` — exact template **and** schema.
2. `templateId === -1` — any template whose **schema** equals the slot schema.
3. Exact slots bind first so a specific template is not stolen by a wildcard.

This lab only assigns assets to slots. Mint, burn, minter auth, and supply checks live in the simple and hybrid blend labs.

## What this is not

- Not a full craft transaction.
- Not a live schema table read.
- Not wasm.
