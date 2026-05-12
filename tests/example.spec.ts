import { test, expect } from '@playwright/test';

test('homepage loads successfully', async ({ page }) => {
  await page.goto('https://www.rockyridgesfarm.com/');

  await expect(page).toHaveURL(/rockyridgesfarm/);
});