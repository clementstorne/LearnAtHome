const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      readDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { paranoid: true }
  );

  return Message;
};
