const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password, telephone, adress, avatar, wishlist} = req.body;

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
        avatar: "C:/Users/Alumno/Documents/Back-Proyecto-final-E-Commerce-/Proyecto_E-Commerce/Proyecto Base/public/images/users/default-user-avatar.png",
        role: "user",
        wishlist: "[]"
      });

      res.status(201).json({
        message: "Usuario creado correctamente",
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName
        }
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
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.nombre,
          role: user.role
        }
      });

    } catch (err) {
      res.status(500).json({ message: "Error interno", error: err });
    }
  }
};
