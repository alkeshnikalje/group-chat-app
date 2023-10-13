const Group = require("../models/group");
const User = require("../models/user");
const UserGroup = require("../models/usergroup");
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(403)
        .json({ success: false, msg: "name cannot be empty" });
    }
    const group = await Group.create({ name, createdBy: req.user.id });
    await UserGroup.create({ userId: group.createdBy, groupId: group.id });
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
        msg: "you are not allowed to delete the group. Only admin can",
      });
    }
    await group.destroy();
    return res.json({ success: true, msg: "group deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { userId, groupId } = req.params;
    const [group, user] = await Promise.all([
      Group.findOne({ where: { id: groupId } }),
      User.findOne({ where: { id: userId } }),
    ]);

    if (!group) {
      return res.status(404).json({ success: false, msg: "Group not found" });
    }
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    if (group.createdBy !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, msg: "you cannot add user" });
    }
    const groupUser = await UserGroup.findOne({ where: { userId } });
    if (groupUser) {
      return res
        .status(404)
        .json({
          success: false,
          msg: `${user.name} already exists in the group`,
        });
    }
    await UserGroup.create({ userId, groupId });
    return res.status(201).json({
      success: true,
      msg: `${user.name} has been added to the ${group.name}`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
