const { faker } = require('@faker-js/faker');
const { Product } = require('../src/models');

const categories = ['UNKNOWN', 'CLOTHS', 'FOOD', 'HOUSEWARES', 'AUTOMOTIVE', 'TOOLS'];

class ProductFactory {
  static build(overrides = {}) {
    return {
      id: faker.number.int({ min: 1, max: 10000 }),
      name: faker.helpers.arrayElement(['Hat', 'Pants', 'Shirt', 'Apple', 'Banana', 'Pots', 'Towels', 'Ford', 'Chevy', 'Hammer', 'Wrench']),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price({ min: 0.5, max: 2000.0, dec: 2 })),
      available: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(categories),
      ...overrides
    };
  }

  static async create(overrides = {}) {
    const data = this.build(overrides);
    return await Product.create(data);
  }

  static buildList(count, overrides = {}) {
    return Array.from({ length: count }, () => this.build(overrides));
  }

  static async createList(count, overrides = {}) {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(await this.create(overrides));
    }
    return list;
  }
}

module.exports = ProductFactory;
