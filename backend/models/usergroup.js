const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UserGroup = sequelize.define("usersgroups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users", // This should be the name of the User model
      key: "id",
    },
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "groups", // This should be the name of the Group model
      key: "id",
    },
  },
});

module.exports = UserGroup;
