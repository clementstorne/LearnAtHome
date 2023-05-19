const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  return Task;
};
