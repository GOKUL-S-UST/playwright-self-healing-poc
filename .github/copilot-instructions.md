# Instructions for Copilot

This repo is a React (Vite + TypeScript) demo shop with Playwright specs in `tests/`.
`feature-manifest.json` maps source files to specs.

There are three kinds of tasks. Identify which one you are doing before acting.

- Mode A: Test maintenance (self-heal) after a code change in a PR.
- Mode B: Application development (build or change app features).
- Mode C: New requirement (turn a requirement issue into tests).

---

## Mode A: Test maintenance (self-heal)

Applies ONLY when the request comes from the self-heal bot comment (contains `<!-- self-heal-bot -->`)
or explicitly asks you to "update/extend/fix tests" after a code change.

Read the diff of the changed files, then classify the change:

| Change | What to do |
|---|---|
| Locator or `data-testid` renamed, same behavior | Update the spec to use the new locator. |
| New field or element added | Extend the spec to cover it. |
| Business rule changed (prices, free-shipping threshold, discount rules, validation, flow order) | **Do NOT edit any file.** Reply "Is this intended?" and describe the change and which assertions it would affect. Stop and wait for a human. |
| No relevant impact | Do nothing. |

A failing test may mean the test is outdated or the developer made a mistake. Never silently rewrite assertions to match a changed business rule.

### Human approval of a business rule change
If, after you asked "Is this intended?", a human comment on the PR explicitly confirms the change is intended
(for example "yes, intended" or "approved"):
1. Update ONLY the assertions that are directly caused by the confirmed rule change.
2. Do not touch any other assertion, locator or test.
3. In your reply, list every assertion you changed (file, test name, old value, new value).
4. Run the affected specs (see Verify).

If there is no explicit human confirmation, do not edit anything.

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
- Do NOT edit `tests/` in this mode. Test updates are handled by the self-heal pipeline (Mode A) or the requirement flow (Mode C).
- `npm run build` and `npx playwright test` must pass before finishing.
- List all new `data-testid`s in the PR description.

---

## Mode C: New requirement (requirement issue to tests)

Applies when you are assigned a GitHub issue created from the "New requirement" template
(it has a title starting with `[Requirement]` and an "Acceptance criteria" section), or when asked to
"write tests for requirement".

Work in two stages. Never skip stage 1.

### Stage 1: Propose scenarios (no code)
1. Read the description and the acceptance criteria.
2. Post ONE comment on the issue listing the test scenarios you plan to write, in plain English.
   - One bullet per scenario.
   - Next to each bullet, name the acceptance criterion it covers (for example "AC1").
   - List any acceptance criterion that is unclear or untestable, and ask about it.
3. End the comment with: "Reply `approved` to continue, or tell me what to change."
4. **Stop. Do not create a branch, edit any file or open a PR until a human replies with approval.**

### Stage 2: Write the spec (only after explicit approval)
1. Create `tests/<feature-name>.spec.ts`, using `tests/helper.ts` for login.
2. Take every expected value (amounts, messages, states) from the acceptance criteria, NOT from reading the
   application code. If the code behaves differently from the criteria, leave the test as written and say so in the PR description.
3. Add one entry to `feature-manifest.json` with the new spec and the source files it depends on.
4. Prefer `getByTestId`. If the test IDs listed in the issue do not exist in the app yet, still write the spec using those IDs.
5. Run the spec. If it fails because the feature is not built yet, say so in the PR description. Do not change the assertions to make it pass.
6. Retry fixes to locators at most 2 times. Never weaken or remove an assertion to make a test pass.

### Rules in this mode
- Only create or edit files under `tests/` and `feature-manifest.json`.
- Never change files under `src/`.
- In the PR description, map each test to the acceptance criterion it covers.
