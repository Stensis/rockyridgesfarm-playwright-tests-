import { test as base, expect, type APIRequestContext } from "@playwright/test";

const API_BASE_URL = "https://api.rockyridgesfarm.com/api";

type Product = {
  id: string;
  stockQty: number;
};

type RockyFixtures = {
  sessionId: string;
  product: Product;
};

export const test = base.extend<RockyFixtures>({
  sessionId: async ({}, use) => {
    await use(crypto.randomUUID());
  },

  product: async ({ request }, use) => {
    const res = await request.get(`${API_BASE_URL}/products?page=1&limit=24`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    const products = body.products || body.data || body;

    const product = products.find((item: Product) => item.stockQty > 2);
    expect(product).toBeTruthy();

    await use(product);
  },
});

export { expect, type APIRequestContext };