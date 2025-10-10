require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.post("/api/chat", async (req, res) => {
  const message = req.body?.message;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("❌ ERROR OPENAI:", error);
    res.status(500).json({ error: "Error en OpenAI API", details: error.message });
  }
});

app.use(express.static("public"));
app.use(express.json());

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
