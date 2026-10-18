import { test, expect } from '@playwright/test';

test('EX-01: Sort Price (low to high) ต้องเรียงราคาจากน้อยไปมาก', async ({ page }) => {
  // Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // Select Price (low to high)
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Verify prices are ascending
  const priceTexts = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceTexts.map((t) => parseFloat(t.replace('$', '')));

  expect(prices).toHaveLength(6);
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});
