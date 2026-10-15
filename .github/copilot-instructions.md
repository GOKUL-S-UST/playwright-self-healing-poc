# Instructions for Copilot

This repo is a React (Vite + TypeScript) demo shop with a Playwright happy-path spec in `tests/happy-path.spec.ts`.
`feature-manifest.json` maps source files to specs.

## When asked to update tests after a code change

Read the diff of the changed files, then classify the change:

| Change | What to do |
|---|---|
| Locator or `data-testid` renamed, same behavior | Update the spec to use the new locator. |
| New field or element added | Extend the spec to cover it. |
| Business rule changed (prices, free-shipping threshold, validation, flow order) | **Do NOT edit any file.** Reply "Is this intended?" and describe the change. Stop. |
| No relevant impact | Do nothing. |

A failing test may mean the test is outdated or the developer made a mistake. Never silently rewrite assertions to match a changed business rule.

## Verify your work

1. Run `npx playwright test <spec>` (the dev server starts automatically).
2. If it fails, fix the spec and re-run. Retry **at most 2 times**.
3. If it still fails, stop. Do not keep changing the test. Comment that it may be an app bug and include the error.

## Rules

- Only edit files under `tests/` (and `feature-manifest.json` if a new scenario needs mapping).
- Never change files under `src/`.
- Prefer `getByTestId` locators.
