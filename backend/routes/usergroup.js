const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");
// const { getAdmin } = require("../controllers/usergroup");
// router.get("/admin/:groupId", userAuth, getAdmin);

module.exports = router;
