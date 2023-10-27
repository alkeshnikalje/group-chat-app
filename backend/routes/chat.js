const express = require("express");
const router = express.Router();
const {
  sendText,
  getMessages,
  sendMultimedia,
} = require("../controllers/chat");
const userAuth = require("../middleware/auth");
const upload = require("../middleware/fileupload");
router.post("/chats/:groupId", userAuth, sendText);

router.post(
  "/multiMedia/:groupId",
  userAuth,
  upload.single("file"),
  sendMultimedia
);

router.get("/chats/group/:groupId", userAuth, getMessages);
module.exports = router;
