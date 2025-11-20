require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

// 🟢 CORS: permitimos al front conectarse
app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.static("public"));
app.use("/auth", authRoutes);

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
