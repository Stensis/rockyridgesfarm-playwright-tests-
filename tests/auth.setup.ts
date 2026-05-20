import { test as setup, expect, Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

async function loginAndSave(page: Page, email: string, password: string, authFile: string) {
  await page.goto("/auth");

  await page.locator("#email").fill(email);
  await page.locator("#password").fill(password);

  await page.locator("form").getByRole("button", { name: "Log In" }).click();

  await expect(page).not.toHaveURL(/auth/);

  await page.context().storageState({ path: authFile });
}

// TO LOGIN IN AS A NORMAL USER
setup("authenticate as user", async ({ page }) => {
  if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
    throw new Error("Missing USER_EMAIL or USER_PASSWORD");
  }

  await loginAndSave(
    page,
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
    "playwright/.auth/user.json"
  );
});

// TO LOGIN AS A STAFF
setup("authenticate as staff", async ({ page }) => {
  if (!process.env.STAFF_EMAIL || !process.env.STAFF_PASSWORD) {
    throw new Error("Missing STAFF_EMAIL or STAFF_PASSWORD");
  }

  await loginAndSave(
    page,
    process.env.STAFF_EMAIL,
    process.env.STAFF_PASSWORD,
    "playwright/.auth/staff.json"
  );
});

// TO LOGIN AS AN ADMIN
setup("authenticate as admin", async ({ page }) => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD");
  }

  await loginAndSave(
    page,
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_PASSWORD,
    "playwright/.auth/admin.json"
  );
});