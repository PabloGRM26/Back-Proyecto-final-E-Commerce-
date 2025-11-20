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

      adress,

      telephone,

      weight,

      height,
    } = req.body;

    // 🔹 SOLO actualizar estos campos (NO planType)

    await User.update(
      {
        firstName,

        lastName,

        adress,

        telephone,

        weight: weight ? parseFloat(weight) : null,

        height: height ? parseFloat(height) : null,
      },

      {
        where: { id: req.user.id },
      },
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

// 🔹 Ruta para actualizar solo el plan

router.put("/update-plan", authRequired, async (req, res) => {
  try {
    const { planType } = req.body;

    const userId = req.user.id;

    console.log("ACTUALIZANDO PLAN:", { userId, planType });

    if (!planType) {
      return res.status(400).json({ message: "Plan no especificado" });
    }

    await User.update(
      { planType },

      { where: { id: userId } },
    );

    const updatedUser = await User.findByPk(userId);

    console.log("Plan actualizado OK:", updatedUser.planType);

    res.json({
      message: "Plan actualizado correctamente",

      planType: updatedUser.planType,
    });
  } catch (error) {
    console.error("ERROR EN UPDATE-PLAN:", error);

    res.status(500).json({ message: "Error al actualizar plan" });
  }
});

module.exports = router;
