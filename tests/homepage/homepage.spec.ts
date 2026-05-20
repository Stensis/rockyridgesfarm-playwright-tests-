import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Homepage Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Rocky/i);
  });

  test("hero section is visible", async ({ page }) => {
    await expect(page.getByText("Fresh from Rocky Ridges Farm")).toBeVisible();
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    // const accessibilityScanResults = await new AxeBuilder({ page })
    //   .disableRules(["heading-order"])
    //   .analyze();

    // expect(accessibilityScanResults.violations).toEqual([]);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
