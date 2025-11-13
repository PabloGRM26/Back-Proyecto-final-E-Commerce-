const { Model, DataTypes } = require("sequelize");

class Orders extends Model {
  static initModel(sequelize) {
    Orders.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        orderNumber: {
          type: DataTypes.STRING,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
        },
        status: {
          type: DataTypes.STRING,
        },
        userId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "orders",
      },
    );
    return Orders;
  }
}

module.exports = { Orders };
