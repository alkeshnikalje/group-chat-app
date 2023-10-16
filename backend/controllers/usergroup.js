const UserGroup = require("../models/usergroup");
const User = require("../models/user");
const Group = require("../models/group");
const sequelize = require("../util/database");
exports.makeAdmin = async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const [group, user, admin] = await Promise.all([
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
    if (!admin) {
      return res.status(404).json({ success: false, msg: "admin not found" });
    }
    if (!admin.isAdmin) {
      return res.status(401).json({
        success: false,
        msg: "you cannot make user the admin of the group",
      });
    }
    const groupUser = await UserGroup.findOne({ where: { userId, groupId } });
    if (!groupUser) {
      return res.status(404).json({
        success: false,
        msg: `${user.name} not found`,
      });
    }
    if (groupUser.isAdmin) {
      return res.status(403).json({
        success: false,
        msg: `${user.name} is already the admin of the group`,
      });
    }
    groupUser.isAdmin = true;
    await groupUser.save();
    return res.json({ success: true, msg: `${user.name} is now admin.` });
  } catch (err) {
    return res.status(500).json({ succuss: false, msg: err.message });
  }
};

exports.getGroupUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const groupId = req.params.groupId;

    const groupMember = await UserGroup.findOne({ where: { groupId, userId } });
    if (!groupMember) {
      return res
        .status(401)
        .json({ success: false, msg: "you cannot see users of this group" });
    }
    const query = `
    SELECT u.id, u.name, u.email, u.phoneNumber, ug.isAdmin
    FROM \`users\` AS u
    JOIN usersgroups AS ug ON u.id = ug.userId
    WHERE ug.groupId = :groupId
  `;

    const groupBelongsTo = await sequelize.query(query, {
      replacements: { groupId },
      type: sequelize.QueryTypes.SELECT,
    });
    if (!groupBelongsTo) {
      return res.status(404).json({ success: false, msg: "users not found" });
    }

    return res.status(200).json({ success: true, groupBelongsTo });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
