import { test, expect } from '@playwright/test';
import { login } from './helper';

test.beforeEach(async ({ page }) => login(page));

test('quick add updates header count', async ({ page }) => {
  await page.getByTestId('quick-add-3').click();
  await expect(page.getByTestId('toast')).toBeVisible();
  await expect(page.getByTestId('header-cart-count')).toHaveText('1');
});

test('quantity controls update totals (shipping rule unchanged)', async ({ page }) => {
  await page.getByTestId('quick-add-3').click(); // Wireless Mouse $25
  await page.getByTestId('go-checkout').click();

  await page.getByTestId('qty-increase-3').click();
  await expect(page.getByTestId('qty-value-3')).toHaveText('2');
  await expect(page.getByTestId('subtotal')).toHaveText('Subtotal: $50');
  await expect(page.getByTestId('shipping')).toHaveText('Shipping: $10');
  await expect(page.getByTestId('total')).toHaveText('Total: $60');

  await page.getByTestId('qty-decrease-3').click();
  await expect(page.getByTestId('qty-value-3')).toHaveText('1');

  await page.getByTestId('remove-item-3').click();
  await expect(page.getByTestId('cart-item')).toHaveCount(0);
  await expect(page.getByTestId('submit-order')).toBeDisabled();
});

test('free shipping at $100 or more', async ({ page }) => {
  await page.getByTestId('quick-add-4').click(); // $129
  await page.getByTestId('go-checkout').click();
  await expect(page.getByTestId('shipping')).toHaveText('Shipping: $0');
  await expect(page.getByTestId('total')).toHaveText('Total: $129');
});

test('cart persists after reload', async ({ page }) => {
  await page.getByTestId('quick-add-1').click();
  await page.reload();
  await expect(page.getByTestId('header-cart-count')).toHaveText('1');
});

test('cart drawer opens, edits and closes', async ({ page }) => {
  await page.getByTestId('quick-add-3').click();
  await page.getByTestId('open-cart-drawer').click();

  const drawer = page.getByTestId('cart-drawer');
  await expect(drawer).toBeVisible();
  await expect(drawer.getByTestId('drawer-cart-item')).toHaveCount(1);
  await drawer.getByTestId('drawer-qty-increase-3').click();
  await expect(drawer.getByTestId('drawer-subtotal')).toContainText('$50');

  await page.keyboard.press('Escape');
  await expect(drawer).toHaveCount(0);

  await page.getByTestId('open-cart-drawer').click();
  await page.getByTestId('drawer-checkout').click();
  await expect(page).toHaveURL(/\/checkout/);
});