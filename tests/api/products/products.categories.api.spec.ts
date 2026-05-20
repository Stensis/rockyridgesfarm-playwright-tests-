import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

const categories = [
  "fresh-vegetables",
  "seasonal-fruits",
  "leafy-greens",
  "tubers-roots",
  "herbs-spices",
  "dairy-eggs",
  "grains-pantry",
];

test.describe("Product Categories API Tests", () => {

  // Validate category filtering works correctly
  for (const category of categories) {

    test(`should fetch ${category} products`, async ({ request }) => {

      const response = await request.get(
        `${API_URL}?page=1&limit=24&categorySlug=${category}`
      );

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.page).toBe(1);
      expect(body.products.length).toBeGreaterThan(0);

      for (const product of body.products) {
        expect(product.category.slug).toBe(category);
      }

    });

  }

  // Validate invalid category returns no products
  test("should return no products for invalid category", async ({ request }) => {

    const response = await request.get(
      `${API_URL}?page=1&limit=24&categorySlug=wrong-category`
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBe(0);

  });

});

