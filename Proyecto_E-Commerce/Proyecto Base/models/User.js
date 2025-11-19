const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        adress: {
          type: DataTypes.STRING,
        },
        telephone: {
          type: DataTypes.STRING,
        },
        wishlist: {
          type: DataTypes.JSON,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: "user",
        },
        birthdate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        weight: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        height: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        IMC: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        basalMetabolicRate: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        planType: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: "Gratis",
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );
    return User;
  }
}

module.exports = { User };
