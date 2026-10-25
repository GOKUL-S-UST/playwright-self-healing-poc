# Instructions for Copilot

This repo is a React (Vite + TypeScript) demo shop with Playwright specs in `tests/`.
`feature-manifest.json` maps source files to specs.

There are two kinds of tasks. Identify which one you are doing before acting.

---

## Mode A: Test maintenance (self-heal)

Applies ONLY when the request comes from the self-heal bot comment (contains `<!-- self-heal-bot -->`)
or explicitly asks you to "update/extend/fix tests" after a code change.

Read the diff of the changed files, then classify the change:

| Change | What to do |
|---|---|
| Locator or `data-testid` renamed, same behavior | Update the spec to use the new locator. |
| New field or element added | Extend the spec to cover it. |
| Business rule changed (prices, free-shipping threshold, validation, flow order) | **Do NOT edit any file.** Reply "Is this intended?" and describe the change. Stop. |
| No relevant impact | Do nothing. |

A failing test may mean the test is outdated or the developer made a mistake. Never silently rewrite assertions to match a changed business rule.

### Verify
1. Run `npx playwright test <spec>` (the dev server starts automatically).
2. If it fails, fix the spec and re-run. Retry **at most 2 times**.
3. If it still fails, stop. Comment that it may be an app bug and include the error.

### Rules in this mode
- Only edit files under `tests/` (and `feature-manifest.json` if a new scenario needs mapping).
- Never change files under `src/`.
- Prefer `getByTestId` locators.

---

## Mode B: Application development

Applies when the task asks you to build or change app features/UI (e.g. "Phase 2: shopping features").

### Rules in this mode
- You MAY edit `src/`, `index.html`, `src/styles.css`, and add new components/pages.
- Plain CSS only; no new UI/runtime libraries unless the task says so.
- Keep every existing `data-testid` working; add kebab-case `data-testid`s to new interactive elements.
- Do NOT change business rules (prices, shipping fee, free-shipping threshold, totals) unless the task explicitly says so.
- Do NOT edit `tests/` in this mode. Test updates are handled by the self-heal pipeline (Mode A).
- `npm run build` and `npx playwright test` must pass before finishing.
- List all new `data-testid`s in the PR description.
