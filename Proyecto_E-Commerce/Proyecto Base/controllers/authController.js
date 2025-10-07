const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const fakeUser = {
  "usuario@example.com": {
    email: "usuario@example.com",
    hashedPassword: "$2a$10$EjemploDeHashGeneradoPorBcrypt"
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  //  Aquí se valida el usuario en la BD (simplificado)
  if (!email || !password) {
    return res.status(401).json({ error: "Credenciales requeridas" });
  }

   // Buscar usuario en la "base de datos"
  const user = fakeUserDB[email, hashedPassword];
  if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }

  // Comparar contraseña ingresada con el hash almacenado
  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }

  // Crear el token si la contraseña es válida
  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      algorithm: ALGS[256] // Opcional, ya que HS256 es el default
    }
  );

  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Falta token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
