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
        name: DataTypes.STRING,
        photo: DataTypes.TEXT,
        price: DataTypes.DECIMAL(10, 2),
        stock: DataTypes.INTEGER.UNSIGNED,
        description: DataTypes.TEXT,
        marca: DataTypes.STRING,
        category: DataTypes.STRING,
        subcategory: DataTypes.STRING,
        features: DataTypes.JSON,
        discount: DataTypes.DECIMAL(5, 2),
        brandLine: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "product",
      }
    );

    return Product;
  }
}

module.exports = { Product };
