const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authRequired = require("../middlewares/authRequired");
const { User } = require("../models");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);
router.put("/update", authRequired, async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);
    console.log("USUARIO AUTENTICADO:", req.user);

    const {
      firstName,
      lastName,
      birthdate,
      adress,
      telephone,
      planType,
      weight,
      height,
      IMC,
      basalMetabolicRate,
    } = req.body;

    // Actualizar usuario
    await User.update(
      {
        firstName,
        lastName,
        birthdate,
        adress,
        telephone,
        planType,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        IMC: IMC ? parseFloat(IMC) : null,
        basalMetabolicRate: basalMetabolicRate ? parseFloat(basalMetabolicRate) : null,
      },
      {
        where: { id: req.user.id },
      }
    );

    // Obtener usuario actualizado
    const updatedUser = await User.findByPk(req.user.id);
    console.log("Usuario actualizado OK:", updatedUser);
    res.json(updatedUser);

  } catch (error) {
    console.error("ERROR EN UPDATE:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});



module.exports = router;
