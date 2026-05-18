import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {

  test('homepage loads successfully', async ({ page }) => {

    await page.goto('/');

    await expect(page).toHaveTitle(/Rocky/i);

  });

  test('hero section is visible', async ({ page }) => {

    await page.goto('/');

    await expect(
      page.getByText('Fresh from Rocky Ridges Farm')
    ).toBeVisible();

  });

});