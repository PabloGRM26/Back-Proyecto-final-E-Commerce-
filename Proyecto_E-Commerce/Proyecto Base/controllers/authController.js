const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
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
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });

    } catch (err) {
      return res.status(500).json({ message: "Error interno", error: err });
    }
  }
};
