const Chat = require("../models/chat");
exports.sendText = async (req, res) => {
  try {
    const id = req.user.id;
    const text = req.body.text;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, msg: "you have not written anything" });
    }
    const newChat = await Chat.create({ text, userId: id });
    return res.status(201).json({ success: true, newChat });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
