const express = require("express");
const router = express.Router();
const { sendText } = require("../controllers/chat");
const userAuth = require("../middleware/auth");

router.post("/chats", userAuth, sendText);

module.exports = router;
