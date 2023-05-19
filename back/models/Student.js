const { DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{72}$/i,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { paranoid: true }
  );

  // Student.checkPassword = async (password, passwordInDb) => {
  //   return await bcrypt.compare(password, passwordInDb);
  // };

  return Student;
};
