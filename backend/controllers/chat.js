const User = require("../models/user");
const Chat = require("../models/chat");
const { Op } = require("sequelize");
exports.sendText = async (req, res) => {
  try {
    const id = req.user.id;
    const text = req.body.text;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, msg: "you have not written anything" });
    }
    const user = await User.findByPk(id);
    const newChat = await Chat.create({ text, userId: id, name: user.name });
    return res.status(201).json({ success: true, newChat });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const chats = await Chat.findAll({
      where: {
        id: {
          [Op.gt]: req.params.chatId,
        },
      },
    });
    return res.status(200).json({ success: true, chats });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
