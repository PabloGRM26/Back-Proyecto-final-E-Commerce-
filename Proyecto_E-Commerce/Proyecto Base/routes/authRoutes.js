const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/VerifyToken");
const authCtrl = require("../controllers/authController");

// Ruta de login
router.post("/login", authCtrl.login);

// Ejemplo de ruta protegida
router.get("/perfil", verifyToken.verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.email}` });
});

module.exports = router;
