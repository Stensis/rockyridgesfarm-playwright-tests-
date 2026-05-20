import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

test.describe("Products Validation API Tests", () => {

  // Validate required product fields exist
  test("products should have required fields", async ({ request }) => {

    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    const product = body.products[0];

    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(product.slug).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
    expect(product.category.slug).toBeTruthy();

  });

  // Validate response time performance
  test("products API should respond within 2 seconds", async ({ request }) => {

    const start = Date.now();

    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    const end = Date.now();

    const responseTime = end - start;

    expect(response.status()).toBe(200);

    expect(responseTime).toBeLessThan(2000);

  });

  // Validate products contain images
  test("products should contain images", async ({ request }) => {

    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    const body = await response.json();

    for (const product of body.products) {
      expect(product.images.length)
        .toBeGreaterThan(0);
    }

  });

  // Validate product prices are positive
  test("products should have valid prices", async ({ request }) => {

    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    const body = await response.json();

    for (const product of body.products) {
      expect(product.price).toBeGreaterThan(0);
    }

  });

  // Validate no duplicate product slugs exist
  test("products should not contain duplicate slugs", async ({ request }) => {

    const response = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    const body = await response.json();

    const slugs = body.products.map(
      (product: { slug: string }) => product.slug
    );

    const uniqueSlugs = new Set(slugs);

    expect(uniqueSlugs.size).toBe(slugs.length);

  });

});