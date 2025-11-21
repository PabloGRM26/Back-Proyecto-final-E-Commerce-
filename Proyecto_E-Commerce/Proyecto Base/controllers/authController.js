const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password, telephone, adress, avatar, wishlist } = req.body;

    try {
      const exists = await db.User.findOne({ where: { email } });
      if (exists) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await db.User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        telephone,
        adress,
        avatar:
          "C:/Users/Alumno/Documents/Back-Proyecto-final-E-Commerce-/Proyecto_E-Commerce/Proyecto Base/public/images/users/default-user-avatar.png",
        role: "user",
        wishlist: [],
      });

      res.status(201).json({
        message: "Usuario creado correctamente",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
        },
      });
    } catch (err) {
      console.error(" Error en login:", err);
      return res.status(500).json({ message: "Error interno", error: err });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.firstName,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Error interno", error: err });
    }
  },

  // 🔹 LOGIN PARA ADMIN
  adminLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await db.Admin.findOne({ where: { email } });

      if (!admin) return res.status(404).json({ message: "Admin no encontrado" });

      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      return res.json({
        token,
        user: {
          id: admin.id,
          email: admin.email,
          username: admin.username,
          role: "admin",
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Error interno", error: err });
    }
  },

  me: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) return res.status(401).json({ message: "Token faltante" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await db.User.findByPk(decoded.id);

      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

      // Cálculo del IMC
      let IMC = null;
      if (user.weight && user.height) {
        const heightMeters = user.height / 100; // si lo guardás en cm
        IMC = (user.weight / (heightMeters * heightMeters)).toFixed(2);
      }

      // Cálculo tasa metabólica basal (Harris-Benedict, hombre)
      let basalMetabolicRate = null;
      if (user.weight && user.height && user.birthdate) {
        const age = new Date().getFullYear() - new Date(user.birthdate).getFullYear();

        basalMetabolicRate = Math.round(
          88.362 + 13.397 * user.weight + 4.799 * user.height - 5.677 * age,
        );
      }

      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.birthdate,
        adress: user.adress,
        telephone: user.telephone,
        planType: user.planType,
        weight: user.weight,
        height: user.height,
        IMC,
        basalMetabolicRate,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error interno", error: err });
    }
  },
};
