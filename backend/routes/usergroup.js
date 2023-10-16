const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const { makeAdmin, getGroupUsers } = require("../controllers/usergroup");

router.put("/:userId/:groupId", userAuth, makeAdmin);
router.get("/:groupId", userAuth, getGroupUsers);

module.exports = router;
