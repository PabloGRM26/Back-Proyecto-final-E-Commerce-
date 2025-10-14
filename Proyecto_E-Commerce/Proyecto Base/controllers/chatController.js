const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatHandler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Podés agregar un "system prompt" contextual si querés
    const systemPrompt = `
      Sos un asistente virtual de una tienda online dedicada a la salud, el ocio y el fitness.
      Tus categorías principales son:
      - Multivitamínicos
      - Servicios de ocio
      - Equipos de entrenamiento
      Solo recomendá productos dentro de esas categorías.
      Respondé de forma breve, amable y clara.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("❌ ERROR OPENAI:", error);
    res.status(500).json({
      error: "Error en OpenAI API",
      details: error.message,
    });
  }
}

module.exports = { chatHandler };
