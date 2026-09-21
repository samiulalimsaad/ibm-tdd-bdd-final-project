const { Product } = require('../../src/models');
const ProductFactory = require('../factories');

describe('Product Model Tests', () => {
  test('should read a product', async () => {
    const product = await ProductFactory.create();
    const foundProduct = await Product.findByPk(product.id);
    expect(foundProduct).not.toBeNull();
    expect(foundProduct.id).toBe(product.id);
    expect(foundProduct.name).toBe(product.name);
    expect(foundProduct.description).toBe(product.description);
    expect(parseFloat(foundProduct.price)).toBe(parseFloat(product.price));
  });

  test('should update a product', async () => {
    const product = ProductFactory.build({ id: undefined });
    const createdProduct = await Product.create(product);
    expect(createdProduct.id).toBeDefined();

    createdProduct.description = 'testing';
    const originalId = createdProduct.id;
    await createdProduct.save();

    expect(createdProduct.id).toBe(originalId);
    expect(createdProduct.description).toBe('testing');

    const products = await Product.findAll();
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(originalId);
    expect(products[0].description).toBe('testing');
  });

  test('should delete a product', async () => {
    const product = await ProductFactory.create();
    expect(await Product.count()).toBe(1);
    await product.destroy();
    expect(await Product.count()).toBe(0);
    const foundProduct = await Product.findByPk(product.id);
    expect(foundProduct).toBeNull();
  });

  test('should list all products', async () => {
    const products = await Product.findAll();
    expect(products.length).toBe(0);
    for (let i = 0; i < 5; i++) {
      await ProductFactory.create();
    }
    const allProducts = await Product.findAll();
    expect(allProducts.length).toBe(5);
  });

  test('should find a product by name', async () => {
    const products = [];
    for (let i = 0; i < 5; i++) {
      products.push(await ProductFactory.create());
    }
    const targetName = products[0].name;
    const count = products.filter(p => p.name === targetName).length;
    const foundProducts = await Product.findAll({ where: { name: targetName } });
    expect(foundProducts.length).toBe(count);
    for (const prod of foundProducts) {
      expect(prod.name).toBe(targetName);
    }
  });

  test('should find a product by category', async () => {
    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push(await ProductFactory.create());
    }
    const targetCategory = products[0].category;
    const count = products.filter(p => p.category === targetCategory).length;
    const foundProducts = await Product.findAll({ where: { category: targetCategory } });
    expect(foundProducts.length).toBe(count);
    for (const prod of foundProducts) {
      expect(prod.category).toBe(targetCategory);
    }
  });

  test('should find a product by availability', async () => {
    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push(await ProductFactory.create());
    }
    const targetAvailability = products[0].available;
    const count = products.filter(p => p.available === targetAvailability).length;
    const foundProducts = await Product.findAll({ where: { available: targetAvailability } });
    expect(foundProducts.length).toBe(count);
    for (const prod of foundProducts) {
      expect(prod.available).toBe(targetAvailability);
    }
  });
});
