const express = require("express");
const userAuth = require("../middleware/auth");
const router = express.Router();
const { createGroup, deleteGroup, addUser } = require("../controllers/group");

router.post("/group", userAuth, createGroup);
router.delete("/group/:groupId", userAuth, deleteGroup);
router.post("/:userId/group/:groupId/", userAuth, addUser);
module.exports = router;
