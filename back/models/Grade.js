const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Grade = sequelize.define(
    "Grade",
    {
      name: {
        type: DataTypes.ENUM(
          "Sixième",
          "Cinquième",
          "Quatrième",
          "Troisième",
          "Seconde",
          "Première",
          "Terminale"
        ),
        primaryKey: true,
      },
    },
    { paranoid: true }
  );

  return Grade;
};
