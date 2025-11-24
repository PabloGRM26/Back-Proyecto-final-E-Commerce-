require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

// 1️⃣ Inicializar conexión
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_CONNECTION || "mysql",
    logging: false,
  }
);

// 2️⃣ Importar clases de modelos
const { User } = require("./User");
const { Admin } = require("./Admin");
const { Product } = require("./Product");
const { Cart } = require("./Carrito");

// 3️⃣ Inicializar modelos
User.initModel(sequelize);
Admin.initModel(sequelize);
Product.initModel(sequelize);
Cart.initModel(sequelize);

// 4️⃣ Relaciones

// Usuario → Productos
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Usuario → Carrito
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Producto → Carrito
Product.hasMany(Cart, { foreignKey: "productId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

// 5️⃣ Export
module.exports = {
  sequelize,
  Sequelize,
  User,
  Admin,
  Product,
  Cart,
};
