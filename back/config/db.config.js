const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

const db = {};
db.sequelize = sequelize;
db.Tutor = require("../models/Tutor")(sequelize);
db.Student = require("../models/Student")(sequelize);
db.Message = require("../models/Message")(sequelize);
db.Event = require("../models/Event")(sequelize);
db.Task = require("../models/Task")(sequelize);
db.Grade = require("../models/Grade")(sequelize);

db.Grade.hasMany(db.Student, { onDelete: "cascade" });
db.Student.belongsTo(db.Grade);
db.Tutor.hasMany(db.Message, { onDelete: "cascade" });
db.Tutor.hasMany(db.Event, { onDelete: "cascade" });
db.Tutor.hasMany(db.Task, { onDelete: "cascade" });

db.sequelize.sync({ force: true });
// db.sequelize.sync({ alter: true });

module.exports = db;
