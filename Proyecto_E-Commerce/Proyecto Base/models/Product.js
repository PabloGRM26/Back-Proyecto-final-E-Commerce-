const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
          {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        photo: {
          type: DataTypes.TEXT,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
        },
        stock: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        description: {
          type: DataTypes.TEXT,
        },
        marca: {
          type: DataTypes.STRING,
        },
        category: {
          type: DataTypes.STRING, // Ej: "Suplementos", "Proteinas", "Relax", etc.
        },
        subcategory: {
          type: DataTypes.STRING, // Ej: "Creatina", "Whey protein", "Casuales", etc.
        },
        features: {
          type: DataTypes.JSON, // Ej: ["Sin gluten", "Con sabor", "Impermeable"]
        },
        discount: {
          type: DataTypes.DECIMAL(5, 2),
        },
        brandLine: {
          type: DataTypes.STRING, // Ej: "Eboost", "Kinetic", "Eudaimonia"
        },
      },
      {
        sequelize,
        modelName: "product", // Nombre del modelo en singular y en minúscula.
      },
    );

    return Product;
  }
}

module.exports = Product;
