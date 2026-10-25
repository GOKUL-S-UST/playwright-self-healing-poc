import { test, expect } from '@playwright/test';
import { login } from './helper';

test.beforeEach(async ({ page }) => login(page));

test('toggle wishlist and move to cart', async ({ page }) => {
  const toggle = page.getByTestId('product-1').getByTestId('wishlist-toggle-1');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByTestId('header-wishlist-count')).toHaveText('1');

  await page.getByTestId('header-wishlist-link').click();
  await expect(page.getByTestId('wishlist-page')).toBeVisible();
  await expect(page.getByTestId('product-1')).toBeVisible();

  await page.getByTestId('wishlist-move-1').click();
  await expect(page.getByTestId('header-wishlist-count')).toHaveText('0');
  await expect(page.getByTestId('header-cart-count')).toHaveText('1');
});

test('wishlist persists after reload', async ({ page }) => {
  await page.getByTestId('product-2').getByTestId('wishlist-toggle-2').click();
  await page.reload();
  await expect(page.getByTestId('header-wishlist-count')).toHaveText('1');
});