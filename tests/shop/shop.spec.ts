import { test, expect } from '@playwright/test';

test.describe('Shop Tests', () => {
  test('shop products are visible', async ({ page }) => {
    await page.goto('/shop');

    await expect(page.getByText('Fresh Carrots')).toBeVisible();
  });

  test('can open a product', async ({ page }) => {
    await page.goto('/shop');

    await page.getByText('Fresh Carrots').click();

    await expect(page).toHaveURL(/product/);
  });
});