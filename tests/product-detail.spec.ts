import { test, expect } from '@playwright/test';
import { login } from './helper';

test.beforeEach(async ({ page }) => login(page));

test('detail shows stock, gallery and related products', async ({ page }) => {
  await page.getByTestId('view-product-2').click();
  await expect(page.getByTestId('product-name')).toHaveText('Mechanical Keyboard');
  await expect(page.getByTestId('stock-status')).toBeVisible();

  await page.getByTestId('gallery-thumb-2').click();
  await expect(page.getByTestId('gallery-thumb-2')).toHaveAttribute('aria-pressed', 'true');

  await expect(page.getByTestId('related-products')).toBeVisible();
});

test('quantity picker adds chosen qty', async ({ page }) => {
  await page.getByTestId('view-product-3').click();
  await page.getByTestId('detail-qty').fill('2');
  await page.getByTestId('add-product-to-cart').click();
  await expect(page.getByTestId('header-cart-count')).toHaveText('2');
});

test('recently viewed is tracked', async ({ page }) => {
  await page.getByTestId('view-product-1').click();
  await page.getByTestId('back-to-products').click();
  await expect(page.getByTestId('recently-viewed')).toBeVisible();
  await expect(page.getByTestId('recent-product-1')).toBeVisible();
});