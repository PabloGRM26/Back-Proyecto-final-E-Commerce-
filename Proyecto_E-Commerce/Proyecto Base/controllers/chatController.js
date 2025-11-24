const OpenAI = require("openai");
const { Product, Cart } = require("../models"); 
const { Op } = require("sequelize");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🧠 Guardamos las últimas recomendaciones por usuario
const lastRecommendations = {};
 
async function chatHandler(req, res) {
  const { message, userId } = req.body;

  if (!message || !userId) {
    return res.status(400).json({ error: "Missing message or userId" });
  }

  console.log("📩 MENSAJE DEL USUARIO:", message);
  console.log("👤 USER ID:", userId);

  // --------------------------------------------------
  // 1️⃣ ¿El usuario quiere agregar un producto al carrito?
  // --------------------------------------------------
  const addIntent = /agregar|comprar|llevar/i.test(message);

  if (addIntent) {
    console.log("🛒 INTENCIÓN DE AGREGAR DETECTADA");

    const list = lastRecommendations[userId];
    if (!list || list.length === 0) {
      console.log("⚠️ No hay lista previa, no puedo agregar.");
      return res.json({
        reply: "No tengo productos recientes para agregar. Primero decime qué buscás."
      });
    }

    let productToAdd = null;

    // 📌 A: "agregar el primero / segundo / tercero"
    const numberMatch = message.match(/primero|segundo|tercero/i);
    if (numberMatch) {
      const index = numberMatch[0] === "primero" ? 0 :
                    numberMatch[0] === "segundo" ? 1 :
                    numberMatch[0] === "tercero" ? 2 : null;

      productToAdd = list[index];
    }

    // 📌 B: "agregar Cata", "agregar Creatina", etc.
    if (!productToAdd) {
      productToAdd = list.find((p) =>
        message.toLowerCase().includes(p.name.toLowerCase().slice(0, 5))
      );
    }

    console.log("🔍 PRODUCTO IDENTIFICADO PARA AGREGAR:", productToAdd?.name);

    if (!productToAdd) {
      return res.json({
        reply: "No pude identificar qué producto querés agregar. Probá diciendo “agregar el primero” o parte del nombre."
      });
    }

    // 🛒 Guardar en el carrito
    await Cart.create({
      userId,
      productId: productToAdd.id,
      quantity: 1
    });

    return res.json({
      reply: `Listo, agregué **${productToAdd.name}** a tu carrito 🛒`
    });
  }

  // --------------------------------------------------
  // 2️⃣ Búsqueda normal de productos
  // --------------------------------------------------
  const keywords = message.toLowerCase().split(/\s+/).filter(w => w.length > 1);

  const conditions = keywords.map(k => ({
    [Op.or]: [
      { name: { [Op.like]: `%${k}%` } },
      { description: { [Op.like]: `%${k}%` } },
      { category: { [Op.like]: `%${k}%` } },
      { subcategory: { [Op.like]: `%${k}%` } },
    ],
  }));

  const products = await Product.findAll({
    where: { [Op.and]: conditions },
    limit: 5,
  });

  // 🔥 Guardamos la lista encontrada (clave: userId)
  lastRecommendations[userId] = products;

  const productText = products.length
    ? products.map(
        (p, i) =>
          `${i + 1}. ${p.name} (${p.category}/${p.subcategory}) - $${p.price}`
      ).join("\n")
    : "No se encontraron productos";

  // --------------------------------------------------
  // 3️⃣ Llamar a OpenAI
  // --------------------------------------------------
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Sos un asistente VitalIA." },
      { role: "user", content: `Usuario dijo: "${message}"\n\nProductos encontrados:\n${productText}\n\nSi querés, puedo agregarlos al carrito.` },
    ],
  });

  const reply = completion.choices[0].message.content;

  res.json({ reply, products });
}

module.exports = { chatHandler };
