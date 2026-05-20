import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

test.describe("Products Listing API Tests", () => {

  // Fetch all available products
  test("should fetch all products", async ({ request }) => {
    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(1);
    expect(body.products.length).toBeGreaterThan(0);
  });

  // Validate pagination limit
  test("should respect product limit", async ({ request }) => {
    const response = await request.get(
      `${API_URL}?page=1&limit=5`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeLessThanOrEqual(5);
  });

  // Validate sorting endpoint
  test("should fetch sorted products", async ({ request }) => {
    const response = await request.get(
      `${API_URL}?sort=newest&page=1&limit=24`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeGreaterThan(0);
  });

  // Validate pagination changes products
  test("different pages should return different products", async ({ request }) => {

    const page1 = await request.get(
      `${API_URL}?page=1&limit=5`
    );

    const page2 = await request.get(
      `${API_URL}?page=2&limit=5`
    );

    const body1 = await page1.json();
    const body2 = await page2.json();

    expect(body1.products[0].slug)
      .not.toBe(body2.products[0].slug);

  });

});