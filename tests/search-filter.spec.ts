import { test, expect } from '@playwright/test';
import { login } from './helper';

test.beforeEach(async ({ page }) => login(page));

test('search narrows results and syncs the URL', async ({ page }) => {
  await page.getByTestId('search-input').fill('keyboard');
  await expect(page).toHaveURL(/q=keyboard/);
  await expect(page.getByTestId('product-2')).toBeVisible();
  await expect(page.getByTestId('product-3')).toHaveCount(0);
});

test('category filter shows only that category', async ({ page }) => {
  await page.getByTestId('category-filter').selectOption('Audio');
  await expect(page).toHaveURL(/cat=Audio/);
  await expect(page.getByTestId('product-4')).toBeVisible();
  await expect(page.getByTestId('product-2')).toHaveCount(0);
});

test('price range filter', async ({ page }) => {
  await page.getByTestId('price-min').fill('100');
  await expect(page.getByTestId('product-4')).toBeVisible(); // $129
  await expect(page.getByTestId('product-1')).toHaveCount(0); // $45
});

test('sort by price low to high', async ({ page }) => {
  await page.getByTestId('sort-select').selectOption('price-asc');
  await expect(page.locator('[data-testid^="product-"]').first())
    .toHaveAttribute('data-testid', 'product-14'); // Cable Organizer Set $16
});

test('no matches shows empty state, clear filters resets', async ({ page }) => {
  await page.getByTestId('search-input').fill('zzzz-nothing');
  await expect(page.getByTestId('result-count')).toHaveText('0 results');
  await page.getByTestId('clear-filters').click();
  await expect(page.getByTestId('result-count')).toHaveText('16 results');
});