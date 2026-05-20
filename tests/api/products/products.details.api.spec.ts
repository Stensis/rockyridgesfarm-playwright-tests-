import { test, expect } from "@playwright/test";

const API_URL = "https://api.rockyridgesfarm.com/api/products";

test.describe("Product Details API Tests", () => {

  // Validate dynamic product details endpoint
  test("should fetch product details dynamically", async ({ request }) => {

    const productsResponse = await request.get(
      `${API_URL}?page=1&limit=24`
    );

    expect(productsResponse.status()).toBe(200);

    const productsBody = await productsResponse.json();

    const products = productsBody.products;

    expect(products.length).toBeGreaterThan(0);

    const firstProduct = products[0];

    const productSlug = firstProduct.slug;

    const singleProductResponse = await request.get(
      `${API_URL}/${productSlug}`
    );

    expect(singleProductResponse.status()).toBe(200);

    const singleProductBody = await singleProductResponse.json();

    expect(singleProductBody.product).toBeTruthy();

    expect(singleProductBody.product.slug)
      .toBe(productSlug);

  });

  // Validate invalid product slug
  test("should return error for invalid product slug", async ({ request }) => {

    const response = await request.get(
      `${API_URL}/wrong-product-slug`
    );

    expect(response.status()).toBe(404);

  });

});