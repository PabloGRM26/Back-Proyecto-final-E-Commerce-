const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

// Ruta de login
router.post("/login", authCtrl.login);

// Ejemplo de ruta protegida
router.get("/perfil", authCtrl.verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.email}` });
});

module.exports = router;
