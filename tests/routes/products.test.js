const request = require('supertest');
const app = require('../../src/app');
const { Product } = require('../../src/models');
const ProductFactory = require('../factories');

describe('Product Routes Tests', () => {
  test('should get a single product', async () => {
    const testProduct = await ProductFactory.create();
    const response = await request(app).get(`/products/${testProduct.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(testProduct.name);
  });

  test('should update an existing product', async () => {
    const testProduct = ProductFactory.build();
    const createResponse = await request(app)
      .post('/products')
      .send(testProduct);
    expect(createResponse.status).toBe(201);

    const newProduct = createResponse.body;
    newProduct.description = 'unknown';

    const response = await request(app)
      .put(`/products/${newProduct.id}`)
      .send(newProduct);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('unknown');
  });

  test('should delete a product', async () => {
    const testProduct = await ProductFactory.create();
    const initialCount = await Product.count();

    const response = await request(app).delete(`/products/${testProduct.id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const finalCount = await Product.count();
    expect(finalCount).toBe(initialCount - 1);

    const getResponse = await request(app).get(`/products/${testProduct.id}`);
    expect(getResponse.status).toBe(404);
  });

  test('should get a list of products', async () => {
    for (let i = 0; i < 5; i++) {
      await ProductFactory.create();
    }
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });

  test('should query products by name', async () => {
    const products = [];
    for (let i = 0; i < 5; i++) {
      products.push(await ProductFactory.create());
    }
    const targetName = products[0].name;
    const count = products.filter(p => p.name === targetName).length;
    const response = await request(app).get(`/products?name=${encodeURIComponent(targetName)}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
    for (const item of response.body) {
      expect(item.name).toBe(targetName);
    }
  });

  test('should query products by category', async () => {
    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push(await ProductFactory.create());
    }
    const targetCategory = products[0].category;
    const count = products.filter(p => p.category === targetCategory).length;
    const response = await request(app).get(`/products?category=${targetCategory}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
    for (const item of response.body) {
      expect(item.category).toBe(targetCategory);
    }
  });

  test('should query products by availability', async () => {
    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push(await ProductFactory.create());
    }
    const targetAvailability = products[0].available;
    const count = products.filter(p => p.available === targetAvailability).length;
    const response = await request(app).get(`/products?available=${targetAvailability}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(count);
    for (const item of response.body) {
      expect(item.available).toBe(targetAvailability);
    }
  });
});
