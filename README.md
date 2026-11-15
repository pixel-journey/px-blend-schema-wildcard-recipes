# Schema wildcard recipe matching (`template_id: -1`)

Educational **two-pass** matcher: exact slots first, then schema wildcards. Returns asset ids in slot order. No mint/burn — hand results to the simple blend lab for disposition.

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Why exact-before-wildcard |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Slot-order tables |
| [TIPS.md](TIPS.md) | UX and porting |
| [SECURITY.md](SECURITY.md) | Greedy matcher attack |
| [SOURCES.md](SOURCES.md) | AtomicAssets + siblings |

```bash
npm test
```

MIT — Pixel Journey
