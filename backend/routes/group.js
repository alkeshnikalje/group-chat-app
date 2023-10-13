const express = require("express");
const userAuth = require("../middleware/auth");
const router = express.Router();
const { createGroup, deleteGroup } = require("../controllers/group");

router.post("/group", userAuth, createGroup);
router.delete("/group/:groupId", userAuth, deleteGroup);
module.exports = router;
