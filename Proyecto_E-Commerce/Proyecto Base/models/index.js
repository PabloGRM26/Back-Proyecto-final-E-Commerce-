const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuración DB
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

// Importar modelos correctamente
const { User } = require("./User");
const { Admin } = require("./Admin");
const { Product } = require("./Product");

// Inicializar modelos
User.initModel(sequelize);
Admin.initModel(sequelize);
Product.initModel(sequelize);

// Relaciones
User.hasMany(Product, {
  as: "products",
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Product.belongsTo(User, {
  as: "author",
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Admin,
  Product,
};
