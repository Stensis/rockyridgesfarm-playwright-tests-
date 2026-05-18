import { test, expect } from "@playwright/test";

test.describe("Cart Tests", () => {
  test("add product to cart", async ({ page }) => {
    await page.goto("/shop");

    await page.getByLabel("Add to cart").first().click();

    await page
      .getByRole("link", {
        name: "Cart",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/cart/);
  });
});
