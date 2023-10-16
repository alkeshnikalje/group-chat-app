const Group = require("../models/group");
const User = require("../models/user");
const UserGroup = require("../models/usergroup");
const sequelize = require("../util/database");
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(403)
        .json({ success: false, msg: "name cannot be empty" });
    }
    const group = await Group.create({ name, createdBy: req.user.id });
    await UserGroup.create({
      userId: group.createdBy,
      groupId: group.id,
      isAdmin: true,
    });
    group.dataValues.isAdmin = true;
    return res.status(201).json({ success: true, group });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ success: false, msg: "group not found" });
    }
    if (group.createdBy !== req.user.id) {
      return res.status(401).json({
        success: false,
        msg: "you are not allowed to delete the group.",
      });
    }
    await group.destroy();
    return res.json({ success: true, msg: "group deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
    SELECT g.id, g.name, g.createdBy, ug.isAdmin
    FROM \`groups\` AS g
    JOIN usersgroups AS ug ON g.id = ug.groupId
    WHERE ug.userId = :userId
  `;

    const userBelongsTo = await sequelize.query(query, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });

    if (!userBelongsTo) {
      return res.status(404).json({ success: false, msg: "Groups not found" });
    }

    return res.status(200).json({ success: true, userBelongsTo });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const [group, user, groupMember] = await Promise.all([
      Group.findOne({ where: { id: groupId } }),
      User.findOne({ where: { id: userId } }),
      UserGroup.findOne({ where: { userId: req.user.id, groupId } }),
    ]);

    if (!group) {
      return res.status(404).json({ success: false, msg: "Group not found" });
    }
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    if (!groupMember) {
      return res.status(404).json({ success: false, msg: "admin not found" });
    }
    if (!groupMember.isAdmin) {
      return res
        .status(401)
        .json({ success: false, msg: "you cannot add user" });
    }
    const groupUser = await UserGroup.findOne({ where: { userId, groupId } });
    if (groupUser) {
      return res.status(403).json({
        success: false,
        msg: `${user.name} already exists in the group`,
      });
    }
    const addedUser = await UserGroup.create({ userId, groupId });
    const userObj = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      isAdmin: addedUser.isAdmin,
    };
    return res.status(201).json({
      success: true,
      msg: `${user.name} has been added to the ${group.name}`,
      userObj,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const [group, user, groupMember] = await Promise.all([
      Group.findOne({ where: { id: groupId } }),
      User.findOne({ where: { id: userId } }),
      UserGroup.findOne({ where: { userId: req.user.id, groupId } }),
    ]);
    if (!group) {
      return res.status(404).json({ success: false, msg: "Group not found" });
    }
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    if (!groupMember) {
      return res.status(404).json({ success: false, msg: "admin not found" });
    }
    if (!groupMember.isAdmin) {
      return res
        .status(401)
        .json({ success: false, msg: "you cannot remove user" });
    }
    const groupUser = await UserGroup.findOne({ where: { userId, groupId } });
    if (!groupUser) {
      return res.status(404).json({
        success: false,
        msg: `${user.name} not found`,
      });
    }
    await groupUser.destroy();
    return res.json({
      success: true,
      msg: `${user.name} has been removed from the group`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
