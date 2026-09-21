const { Given } = require('@cucumber/cucumber');
const axios = require('axios');

Given('the following products', async function (dataTable) {
  const baseUrl = this.baseUrl || 'http://localhost:8000';
  
  const getResponse = await axios.get(`${baseUrl}/products`);
  for (const product of getResponse.data) {
    await axios.delete(`${baseUrl}/products/${product.id}`);
  }

  const rows = dataTable.hashes();
  for (const row of rows) {
    const payload = {
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      available: row.available === 'True' || row.available === 'true',
      category: row.category
    };
    await axios.post(`${baseUrl}/products`, payload);
  }
});
