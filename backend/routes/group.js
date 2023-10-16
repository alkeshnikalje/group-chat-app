const express = require("express");
const userAuth = require("../middleware/auth");
const router = express.Router();
const {
  createGroup,
  getGroups,
  deleteGroup,
  addUser,
  removeUser,
} = require("../controllers/group");

router.post("/group", userAuth, createGroup);
router.get("/group", userAuth, getGroups);
router.delete("/group/:groupId", userAuth, deleteGroup);
router.post("/:userId/group/:groupId/", userAuth, addUser);
router.delete("/:userId/group/:groupId", userAuth, removeUser);
module.exports = router;
