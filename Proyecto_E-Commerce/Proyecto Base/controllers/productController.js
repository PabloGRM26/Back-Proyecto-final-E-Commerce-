const { Product } = require("../models");
const { Op } = require("sequelize");
const { get } = require("../routes/authRoutes");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const where = {};

    if (req.query.marca) {
      where.marca = { [Op.like]: `%${req.query.marca}%` };
    }
    if (req.query.subcategoria) {
      where.subcategoria = { [Op.like]: `%${req.query.subcategoria}%` };
    }
    if (req.query.category) {
      where.category = { [Op.like]: `%${req.query.category}%` };
    }
    if (req.query.caracteristica) {
      where.caracteristicas = { [Op.like]: `%${req.query.caracteristica}%` };
    }
    if (req.query.minPrice && req.query.maxPrice) {
      where.price = {
        [Op.between]: [req.query.minPrice, req.query.maxPrice],
      };
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Display the specified resource.
async function show(req, res) {
  const products = await Product.findByPk(req.params.id);
  if (!products) {
    return res.status(404).json({ error: "Article not found" });
  }
  res.json(products);
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const products = await Product.create(req.body);
    const reloaded = await Product.findByPk(products.id);
    res.status(201).json(reloaded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const products = await Product.findByPk(req.params.id);
    if (!products) return res.status(404).json({ error: "Products not found" });
    await products.update(req.body);
    const reloaded = await Product.findByPk(products.id);
    res.json(reloaded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const deleted = await Product.destroy({ where: { id: req.params.id } });
  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(204).send();
}

async function getFilters(req, res) {
  try {
    const { marca } = req.params;

    const products = await Product.findAll({
      where: { marca },
      attributes: ["category", "subcategory", "marca", "features", "price"],
    });

    // --- CATEGORÍAS ---
    const categoryMap = {};
    for (const p of products) {
      const cat = p.category?.trim();
      const sub = p.subcategory?.trim();
      if (!cat) continue;
      if (!categoryMap[cat]) categoryMap[cat] = new Set();
      if (sub) categoryMap[cat].add(sub);
    }

    const categories = Object.entries(categoryMap).map(([name, subs]) => ({
      name,
      subcategories: Array.from(subs),
    }));

    // --- FEATURES (como array de strings) ---
    const featureSet = new Set();
    for (const p of products) {
      if (Array.isArray(p.features)) {
        p.features.forEach((f) => featureSet.add(f));
      } else if (typeof p.features === "string") {
        featureSet.add(p.features);
      }
    }

    const features = {
      marca: [...new Set(products.map((p) => p.marca).filter(Boolean))],
      caracteristicas: Array.from(featureSet),
    };

    // --- RANGO DE PRECIOS ---
    const prices = products.map((p) => p.price).filter((n) => typeof n === "number");
    const min = prices.length ? Math.min(...prices) : null;
    const max = prices.length ? Math.max(...prices) : null;

    res.json({
      categories,
      features,
      priceRange: { min, max },
    });
  } catch (error) {
    console.error("Error en getFilters:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getProductsByCategory(category) {
  return await Product.findAll({
    where: { category }, // asumiendo que tu tabla tiene campo category
    attributes: ["id", "name", "price", "description", "stock"], // lo que quieras mostrar
  });
}


// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getFilters,
  getProductsByCategory
};
