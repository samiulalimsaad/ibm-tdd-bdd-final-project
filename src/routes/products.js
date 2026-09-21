const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { Op } = require('sequelize');

router.get('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: `Product with id '${req.params.id}' was not found.` });
  }
  return res.status(200).json(product);
});

router.put('/:id', async (req, res) => {
  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: `Product with id '${req.params.id}' was not found.` });
  }
  await product.update(req.body);
  return res.status(200).json(product.serialize ? product.serialize() : product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
  }
  return res.status(204).send();
});

router.get('/', async (req, res) => {
  const { name, category, available } = req.query;
  let products = [];

  if (name) {
    products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    });
  } else if (category) {
    products = await Product.findAll({
      where: { category }
    });
  } else if (available !== undefined) {
    products = await Product.findAll({
      where: { available: available === 'true' }
    });
  } else {
    products = await Product.findAll();
  }

  const results = products.map(p => (p.serialize ? p.serialize() : p));
  return res.status(200).json(results);
});

module.exports = router;
