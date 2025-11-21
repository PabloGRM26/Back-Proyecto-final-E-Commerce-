const { Cart, Product } = require("../models");

async function getCartByUser(req, res) {
  try {
    const { userId } = req.params;

    const items = await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "photo"],
        },
      ],
    });

    const formatted = items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      photo: i.product.photo,
      quantity: i.quantity,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ ERROR getCartByUser:", err);
    res.status(500).json({ error: "Error al obtener carrito" });
  }
}

module.exports = { getCartByUser };
