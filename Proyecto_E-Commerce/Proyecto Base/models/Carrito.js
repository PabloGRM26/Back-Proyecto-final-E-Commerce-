const { Model, DataTypes } = require("sequelize");

class Cart extends Model {
  static initModel(sequelize) {
    Cart.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        productId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: "cart",
        tableName: "carts",
      }
    );
    return Cart;
  }
}

module.exports = { Cart };
