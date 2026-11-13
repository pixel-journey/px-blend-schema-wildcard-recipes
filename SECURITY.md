# Security notes — wildcard slots

| Mitigated | Behavior |
| --- | --- |
| Non-owner offers | refused |
| Duplicate assets | refused |
| Count mismatch | refused |
| Bad template ids | refused |
| Exact-before-wildcard | prevents steal |

Production: chain ownership rows, burnable checks, consumed-id desk, collection mint auth (simple/hybrid blends).
