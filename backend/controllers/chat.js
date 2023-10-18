const User = require("../models/user");
const Chat = require("../models/chat");
const { Op } = require("sequelize");
const UserGroup = require("../models/usergroup");
const Group = require("../models/group");
exports.sendText = async (req, res) => {
  try {
    const id = req.user.id;
    const text = req.body.text;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, msg: "you have not written anything" });
    }
    const [user, member] = await Promise.all([
      User.findByPk(id),
      UserGroup.findOne({ where: { groupId: req.params.groupId, userId: id } }),
    ]);

    if (!member) {
      return res
        .status(401)
        .json({
          success: false,
          msg: "either the group does not exist or you are not the member of this group",
        });
    }
    const newChat = await Chat.create({
      text,
      userId: id,
      name: user.name,
      groupId: member.groupId,
    });
    return res.status(201).json({ success: true, newChat });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const groupMember = await UserGroup.findOne({
      where: { userId: req.user.id, groupId: req.params.groupId },
    });
    if (!groupMember) {
      return res
        .status(401)
        .json({ success: false, msg: "cannot access messages" });
    }
    const chats = await Chat.findAll({
      where: { groupId: req.params.groupId },
    });
    return res.status(200).json({ success: true, chats });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
