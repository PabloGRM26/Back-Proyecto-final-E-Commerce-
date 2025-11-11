const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configurar la conexión a la base de datos:

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: ecommerce
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_CONNECTION || "mysql", // postgres | mysql | sqlite | mssql
    logging: false,
  }
);

// Requerir todos los modelos:
const { User } = require("./User");
const { Admin } = require("./Admin");
const Product = require("./Product");

// Inicializar todos los modelos:
User.initModel(sequelize);
Admin.initModel(sequelize);
Product.initModel(sequelize);

/*
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 *
 * Por ejemplo, si un User está relacionado con un Article, establecerlo
 * aquí abajo.
 */

User.hasMany(Product, { as: "product", foreignKey: "userId", onDelete: "CASCADE" });
Product.belongsTo(User, { as: "author", foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Admin,
  Product,
};
