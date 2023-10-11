const express = require("express");
const router = express.Router();
const { sendText, getMessages } = require("../controllers/chat");
const userAuth = require("../middleware/auth");

router.post("/chats", userAuth, sendText);
router.get("/chats", userAuth, getMessages);
module.exports = router;
