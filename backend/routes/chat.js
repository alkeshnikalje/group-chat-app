const express = require("express");
const router = express.Router();
const { sendText, getMessages } = require("../controllers/chat");
const userAuth = require("../middleware/auth");

router.post("/chats/:groupId", userAuth, sendText);
router.get("/chats/group/:groupId", userAuth, getMessages);
module.exports = router;
