import { test, expect } from '@playwright/test';

test('happy path: login -> browse -> add to cart -> checkout', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.getByTestId('login-username').fill('demo');
  await page.getByTestId('login-password').fill('password');
  await page.getByTestId('login-submit').click();

  // Products list
  await expect(page).toHaveURL(/\/products$/);
  await page.getByTestId('view-product-2').click();

  // Product detail
  await expect(page.getByTestId('product-name')).toHaveText('Mechanical Keyboard');
  await expect(page.getByTestId('product-price')).toHaveText('$90');
  await page.getByTestId('add-product-to-cart').click();

  // Checkout
  await page.getByTestId('go-checkout').click();
  await expect(page.getByTestId('cart-item')).toHaveCount(1);
  await expect(page.getByTestId('subtotal')).toHaveText('Subtotal: $90');
  await expect(page.getByTestId('shipping')).toHaveText('Shipping: $10');
  await expect(page.getByTestId('total')).toHaveText('Total: $100');

  await page.getByTestId('submit-order').click();
  await expect(page.getByTestId('order-confirmation')).toBeVisible();
});
