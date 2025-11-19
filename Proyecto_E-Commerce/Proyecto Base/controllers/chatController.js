const OpenAI = require("openai");
const { Product } = require("../models"); // Ajustá según tu modelo
const { Op } = require("sequelize");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatHandler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    console.log("📩 MENSAJE DEL USUARIO:", message);

    // Convertimos el mensaje en palabras clave simples
    const keywords = message
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1); // descartamos palabras muy cortas

    console.log("🔍 Palabras para búsqueda:", keywords);

    // Creamos condiciones de búsqueda para Sequelize
    const conditions = keywords.map((keyword) => ({
      [Op.or]: [
        { name: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { category: { [Op.like]: `%${keyword}%` } },
        { subcategory: { [Op.like]: `%${keyword}%` } },
      ],
    }));

    console.log("🔍 Condiciones de búsqueda Sequelize:", conditions);

    // Buscamos productos en la base de datos
    const products = await Product.findAll({
      where: { [Op.and]: conditions },
      limit: 5,
    });

    console.log("🛒 Productos encontrados en DB:", products.length ? products.map(p => p.name) : "[]");

    // Formateamos productos para enviar a OpenAI
    const productText = products.length
      ? products
          .map(
            (p) =>
              `- ${p.name} (${p.category}/${p.subcategory}): $${p.price}, Stock: ${p.stock}`
          )
          .join("\n")
      : "No se encontraron productos";

    if (!products.length) console.warn("⚠️ No se encontraron productos que coincidan con el mensaje");

    // Preparar mensaje para OpenAI
    const systemPrompt = `
      Sos un asistente virtual llamado Vital.IA de una tienda online dedicada a la salud, el ocio y el fitness.
      Tus categorías principales son:
      - Multivitamínicos
      - Servicios de ocio
      - Equipos de entrenamiento
      Solo recomendá productos dentro de esas categorías.
      Respondé de forma breve, amable y clara.
      Recordá que la información que brindás no es asesoramiento médico.
      Si el usuario hace una pregunta fuera de tu ámbito, respondé que no podés ayudar con eso.
      Siempre alentá al usuario a explorar los productos y servicios de la tienda.
      Mantené un tono profesional pero accesible.
    `;

    const userContent = `
      Mensaje del usuario: "${message}"
      Productos encontrados:
      ${productText}
    `;

    console.log("🤖 Contenido que se envía a OpenAI:\n", userContent);

    // Llamada a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    });

    const reply = completion.choices[0].message.content;
    console.log("💬 Respuesta de OpenAI:", reply);

    res.json({ reply, products }); // también devolvemos los productos a la app
  } catch (error) {
    console.error("❌ ERROR OPENAI o DB:", error);
    res.status(500).json({
      error: "Error en OpenAI o DB",
      details: error.message,
    });
  }
}

module.exports = { chatHandler };
