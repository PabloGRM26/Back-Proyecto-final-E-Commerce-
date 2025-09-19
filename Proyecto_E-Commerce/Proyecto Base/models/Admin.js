const { Model, DataTypes } = require("sequelize");

class Admin extends Model {
  static initModel(sequelize) {
    Admin.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "admin",
      },
    );
    return Admin;
  }
}

module.exports = { Admin };
