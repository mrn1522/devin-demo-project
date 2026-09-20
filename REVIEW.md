# Review Guidelines

Treat every PR as a deep audit, not a surface pass. Beyond Bug Catcher defaults, actively hunt for security issues, edge cases, performance regressions, and correctness violations. Label low-confidence findings as flags or questions — do not assert breakage without evidence.

## Security

- Flag hardcoded secrets, tokens, API keys, or credentials in any file.
- Flag unsafe DOM/HTML injection: `innerHTML`, `dangerouslySetInnerHTML`, or unsanitized data interpolated into markup.
- Flag `eval`, `new Function`, and other dynamic code execution.
- External input (URL params, `localStorage`, network responses, user input) must be validated or sanitized before use.
- New dependencies: flag unused, unscoped, or unpinned packages.
- Flag weakened security controls: disabled linters, skipped checks, relaxed TypeScript strictness.

## Edge Cases & Correctness

- Check boundary conditions: empty/null/undefined inputs, zero and negative values, off-by-one ranges, min/max extremes.
- Game loop (`requestAnimationFrame`): large `dt` spikes after tab switches or background throttling must not teleport entities or tunnel through collisions — flag unclamped deltas.
- Canvas handling: verify viewport resize, `devicePixelRatio` scaling, and state reset on restart are covered.
- Collision checks must cover edges (ceiling, ground, pipe boundaries), not only center points.
- Async paths: flag unhandled promise rejections, missing error handling on fetch/IO, and races on rapid state changes.

## Performance

- Flag per-frame allocations inside the game loop or render path — object/array creation in `requestAnimationFrame` callbacks causes GC churn.
- Flag redundant canvas state changes, unnecessary `save()`/`restore()` calls, or repeated layout reads in hot paths.
- Event listeners, timers, and observers must have teardown; flag leaks (added but never removed).
- Flag O(n²) or worse algorithms where an obvious O(n) alternative exists.

## Code Quality

- TypeScript strict: flag `any`, unsafe casts, and missing null checks on `document.getElementById` / `canvas.getContext` results.
- New game logic must include unit tests under `tests/`; flag logic merged without coverage.
- Do not flag formatting — ESLint and Prettier already enforce it (`npm run lint`, `npm run format:check`).

## Scope

- Ignore generated output (`dist/`, `*.min.*`) and lockfile churn.
- Markdown-only changes (`docs/`, `*.md`) need only a light pass.
