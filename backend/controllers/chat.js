const User = require("../models/user");
const Chat = require("../models/chat");
const { Op } = require("sequelize");
const UserGroup = require("../models/usergroup");
const Group = require("../models/group");
const AWS = require("aws-sdk");

exports.sendText = async (req, res) => {
  try {
    const id = req.user.id;
    const text = req.body.text;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, msg: "you have not written anything" });
    }
    const [user, member, group] = await Promise.all([
      User.findByPk(id),
      UserGroup.findOne({ where: { groupId: req.params.groupId, userId: id } }),
      Group.findByPk(req.params.groupId),
    ]);
    if (!group) {
      return res.status(404).json({ success: false, msg: "group not found" });
    }
    if (!member) {
      return res.status(401).json({
        success: false,
        msg: "you are not the member of this group",
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

exports.sendMultimedia = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    console.log(file);
    if (!file) {
      return res.status(404).json({ success: false, msg: "file not found" });
    }
    const [user, member, group] = await Promise.all([
      User.findByPk(userId),
      UserGroup.findOne({ where: { groupId: req.params.groupId, userId } }),
      Group.findByPk(req.params.groupId),
    ]);
    if (!group) {
      return res.status(404).json({ success: false, msg: "group not found" });
    }
    if (!member) {
      return res.status(401).json({
        success: false,
        msg: "you are not the member of this group",
      });
    }
    const filename = `${userId}${file.originalname}`;

    let S3bucket = new AWS.S3({
      accessKeyId: process.env.S3ACCESS_KEY,
      secretAccessKey: process.env.S3ACCESS_SECRET,
    });
    var params = {
      Bucket: process.env.BUCKET,
      Key: filename,
      Body: file.buffer,
      ACL: "public-read",
    };

    S3bucket.upload(params, async (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      const newChat = await Chat.create({
        multiMediaUrl: response.Location,
        userId,
        name: user.name,
        groupId: member.groupId,
      });

      return res.status(201).json({ success: true, newChat });
    });
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
