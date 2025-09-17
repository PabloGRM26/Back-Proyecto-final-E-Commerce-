const { Product } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const products = await Products.findAll({
    include: [{ model: Products, as: "author", attributes: { exclude: ["password"] } }],
  });
  res.json(products);
}

// Display the specified resource.
async function show(req, res) {
  const products = await Products.findByPk(req.params.id, {
    include: [{ model: Products, as: "author", attributes: { exclude: ["password"] } }],
  });
  if (!products) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.json(products);
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const products = await Products.create(req.body);
    const reloaded = await Products.findByPk(products.id, {
      include: [{ model: Products, as: "author", attributes: { exclude: ["password"] } }],
    });
    res.status(201).json(reloaded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const products = await Products.findByPk(req.params.id);
    if (!products) return res.status(404).json({ error: "Products not found" });
    await products.update(req.body);
    const reloaded = await Products.findByPk(products.id, {
      include: [{ model: Products, as: "author", attributes: { exclude: ["password"] } }],
    });
    res.json(reloaded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleted = await Products.destroy({ where: { id: req.params.id } });
  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(204).send();
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
