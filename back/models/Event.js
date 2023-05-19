const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("Learn@Home", "Personnel", "Collège/Lycée"),
        defaultValue: "Learn@Home",
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  return Event;
};
