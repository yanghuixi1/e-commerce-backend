const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll({ include: [Product] });
    return res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json("Request failed");
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json("Request failed");
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.categoryName,
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json("Request failed");
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.categoryName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(201).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json("request failed");
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json("Request failed");
  }
});

module.exports = router;
