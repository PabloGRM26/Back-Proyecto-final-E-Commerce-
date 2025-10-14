const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  // Fake BD
  const fakeUser = {
    email: "usuario@example.com",
  };
  fakeUser.hashedPassword = await bcrypt.hash("1234", 10);
  //
  const { email, password } = req.body;
  //User.findOne({ where: { email } });
  //  Aquí se valida el usuario en la BD (simplificado)
  if (!email || !password) {
    return res.status(401).json({ error: "Credenciales requeridas" });
  }

  // // Buscar usuario en la "base de datos"
  // const user = fakeUser[(email, hashedPassword)];
  // if (!user) {
  //   return res.status(401).json({ error: "Usuario no encontrado" });
  // }

  // Comparar contraseña ingresada con el hash almacenado
  const match = await bcrypt.compare(password, fakeUser.hashedPassword);
  if (!match) {
    return res.status(401).json({ error: "Credenciales Invalidas" });
  }

  // Crear el token si la contraseña es válida
  const token = jwt.sign({ email: fakeUser.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ token });
};
