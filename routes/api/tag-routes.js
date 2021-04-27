/**
 * /routes/api/tag-routes.js
 *
 * @description: the `/api/tag` endpoint
 *
 */

const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// get all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }],
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id: ${req.params.id}!` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update one tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id: ${req.params.id}!` });
      return;
    } else {
      res.json(tagData);
    }
  } catch (err) {
    res.status(500).json;
  }
});

// delete one tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id: ${req.params.id}!` });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
