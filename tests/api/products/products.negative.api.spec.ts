import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

test.describe("Products API Negative Tests", () => {
  test("should handle invalid page number", async ({ request }) => {
    const response = await request.get(`${API_URL}?page=-1&limit=24`);

    expect(response.status()).not.toBe(500);
  });

  test("should handle invalid limit", async ({ request }) => {
    const response = await request.get(`${API_URL}?page=1&limit=-5`);

    expect(response.status()).not.toBe(500);
  });

  test("should handle non numeric limit", async ({ request }) => {
    const response = await request.get(`${API_URL}?page=1&limit=abc`);

    expect(response.status()).not.toBe(500);
  });

  test("should return no products for invalid category", async ({ request }) => {
    const response = await request.get(
      `${API_URL}?page=1&limit=24&categorySlug=wrong-category`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBe(0);
  });

  test("should return error for invalid product slug", async ({ request }) => {
    const response = await request.get(`${API_URL}/wrong-product-slug`);

    expect(response.status()).toBe(404);
  });
});