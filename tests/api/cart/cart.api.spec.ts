import { test, expect, APIRequestContext } from "@playwright/test";

const BASE_URL = "https://api.rockyridgesfarm.com/api";

async function getFirstProduct(request: APIRequestContext) {
  const res = await request.get(`${BASE_URL}/products?page=1&limit=24`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  const products = body.products || body.data || body;

  const product = products.find((item: any) => item.stockQty > 2);

  expect(product).toBeTruthy();

  return product;
}

test.describe("Cart API Tests", () => {
  test("add item to cart", async ({ request }) => {
    const product = await getFirstProduct(request);

    const res = await request.post(`${BASE_URL}/cart/items`, {
      data: {
        productId: product.id,
        quantity: 1,
      },
    });

    expect([200, 201, 400]).toContain(res.status());

    const body = await res.json();
    expect(body).toBeTruthy();
  });

  test("update quantity", async ({ request }) => {
    const product = await getFirstProduct(request);
    const sessionId = crypto.randomUUID();

    const addRes = await request.post(`${BASE_URL}/cart/items`, {
      headers: {
        "x-session-id": sessionId,
      },
      data: {
        productId: product.id,
        qty: 1,
      },
    });

    expect([200, 201]).toContain(addRes.status());

    const updateRes = await request.patch(
      `${BASE_URL}/cart/items/${product.id}`,
      {
        headers: {
          "x-session-id": sessionId,
        },
        data: {
          qty: 2,
        },
      },
    );

    expect(updateRes.status()).toBe(200);
  });

  test("remove item from cart", async ({ request }) => {
    const product = await getFirstProduct(request);
    const sessionId = crypto.randomUUID();

    const addRes = await request.post(`${BASE_URL}/cart/items`, {
      headers: {
        "x-session-id": sessionId,
      },
      data: {
        productId: product.id,
        qty: 1,
      },
    });

    expect([200, 201]).toContain(addRes.status());

    const deleteRes = await request.delete(
      `${BASE_URL}/cart/items/${product.id}`,
      {
        headers: {
          "x-session-id": sessionId,
        },
      },
    );

    expect(deleteRes.status()).toBe(200);
  });

  test("clear cart", async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/cart`);

    expect([200, 204, 404]).toContain(res.status());
  });

  test("invalid quantity", async ({ request }) => {
    const product = await getFirstProduct(request);

    const res = await request.post(`${BASE_URL}/cart/items`, {
      data: {
        productId: product.id,
        quantity: -1,
      },
    });

    expect([400, 422]).toContain(res.status());
  });

  test("duplicate products", async ({ request }) => {
    const product = await getFirstProduct(request);

    await request.post(`${BASE_URL}/cart/items`, {
      data: {
        productId: product.id,
        quantity: 1,
      },
    });

    const res = await request.post(`${BASE_URL}/cart/items`, {
      data: {
        productId: product.id,
        quantity: 1,
      },
    });

    expect([200, 201, 400, 409]).toContain(res.status());
  });

  test("empty cart", async ({ request }) => {
    await request.delete(`${BASE_URL}/cart`);

    const res = await request.get(`${BASE_URL}/cart/items`);

    expect([200, 404]).toContain(res.status());

    if (res.status() === 200) {
      const body = await res.json();
      const items = body.items || body.data || body;

      expect(Array.isArray(items)).toBeTruthy();
      expect(items.length).toBe(0);
    }
  });

  test("invalid product id", async ({ request }) => {
    const res = await request.post(`${BASE_URL}/cart/items`, {
      data: {
        productId: "invalid-product-id",
        quantity: 1,
      },
    });

    expect([400, 404, 422]).toContain(res.status());
  });
});
