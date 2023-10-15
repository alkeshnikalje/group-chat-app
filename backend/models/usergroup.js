const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroup = sequelize.define("usersgroups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = UserGroup;
