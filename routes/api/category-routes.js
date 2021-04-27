/**
 * /routes/api/category-routes.js
 *
 * @description: the `/api/categories` endpoint
 *
 */

const router = require('express').Router();
const { Category, Product } = require('../../models');

// get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }],
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with id: ${req.params.id}!` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update one category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with id: ${req.params.id}!` });
      return;
    } else {
      res.json(categoryData);
    }
  } catch (err) {
    res.status(500).json;
  }
});

// delete one category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with id: ${req.params.id}!` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
