import { test, expect } from "@playwright/test";

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigate to home page", async ({ page }) => {
    await page
      .getByRole("banner")
      .getByRole("link", {
        name: "Home",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL("/");
  });

  test("navigate to shop page", async ({ page }) => {
    await page
      .getByRole("banner")
      .getByRole("link", {
        name: "Shop",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/shop/);
  });

  test("navigate to about page", async ({ page }) => {
    await page
      .getByRole("banner")
      .getByRole("link", {
        name: "About",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/about/);
  });

  test("navigate to contact page", async ({ page }) => {
    await page
      .getByRole("banner")
      .getByRole("link", {
        name: "Contact",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/contact/);
  });
});

test.describe("Footer Tests For Shops", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("navigate to fresh vegetables from footer", async ({ page }) => {
    await page
      .getByRole("contentinfo")
      .getByRole("link", {
        name: "Fresh Vegetables",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/category\/fresh-vegetables/);
  });

  test("Navigate to Seasonal Fruits from footer", async ({ page }) => {
    await page
      .getByRole("contentinfo")
      .getByRole("link", {
        name: "Seasonal Fruits",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL("/category\/seasonal-fruits");
  });
});

test.describe("Footer Test For Help", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Navigate to Faqs", async ({ page }) => {
    await page
      .getByRole("contentinfo")
      .getByRole("link", {
        name: "FAQ",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/help\/faq/);
  });
});
