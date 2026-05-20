import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

test.describe("Products API Edge and Security Tests", () => {
  test("should not crash with SQL injection attempt in categorySlug", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_URL}?categorySlug=' OR 1=1 --`
    );

    expect(response.status()).not.toBe(500);
  });

  test("should not crash with XSS attempt in categorySlug", async ({
    request,
  }) => {
    const response = await request.get(
      `${API_URL}?categorySlug=<script>alert('xss')</script>`
    );

    expect(response.status()).not.toBe(500);
  });

  test("should handle extremely large limit safely", async ({ request }) => {
    const response = await request.get(`${API_URL}?page=1&limit=999999`);

    expect(response.status()).not.toBe(500);
  });

  test("should fetch products without query params", async ({ request }) => {
    const response = await request.get(API_URL);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeGreaterThan(0);
  });
});