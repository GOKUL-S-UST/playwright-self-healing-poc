// No-AI step: finds which specs are affected by a PR and writes comment.md
// Usage: node scripts/find-affected.js <base-ref>
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const base = process.argv[2] || 'main';
const MARKER = '<!-- self-heal-bot -->';

const changed = execSync(`git diff --name-only origin/${base}...HEAD`, { encoding: 'utf8' })
  .split('\n')
  .map((f) => f.trim())
  .filter(Boolean);

const manifest = JSON.parse(readFileSync('feature-manifest.json', 'utf8'));

// Supports exact paths and simple * wildcards
const toRegex = (pattern) =>
  new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');

const affectedSpecs = new Set();
const changedSourceFiles = new Set();

for (const scenario of manifest.scenarios) {
  const regexes = scenario.files.map(toRegex);
  for (const file of changed) {
    if (regexes.some((r) => r.test(file))) {
      affectedSpecs.add(scenario.spec);
      changedSourceFiles.add(file);
    }
  }
}

console.log('Changed files:', changed);

if (affectedSpecs.size === 0) {
  console.log('No relevant impact. Nothing to do.');
  process.exit(0);
}

const specs = [...affectedSpecs];
const files = [...changedSourceFiles];

const body = `${MARKER}
@copilot The following files changed in this PR: ${files.map((f) => '`' + f + '`').join(', ')}.
They affect these Playwright specs: ${specs.map((s) => '`' + s + '`').join(', ')}.

Follow the rules in \`.github/copilot-instructions.md\`:

1. Read the diff of those files.
2. Decide the type of change:
   - Only a locator/ID changed, or a new field/element was added: update the spec.
   - A business rule changed (prices, thresholds, validation, flow): DO NOT edit anything. Reply "Is this intended?" and stop.
3. After editing, run: \`npx playwright test ${specs.join(' ')}\`
4. If it fails, fix the spec and re-run. Try at most 2 times.
5. If it still fails, stop and comment that this may be an app bug.
`;

writeFileSync('comment.md', body);
console.log('comment.md written for specs:', specs);
