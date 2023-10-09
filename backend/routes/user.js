const express = require("express");
const router = express.Router();
const { signUp, login, getMe } = require("../controllers/user");
const userAuth = require("../middleware/auth");
router.post("/signup", signUp);

router.post("/login", login);

router.get("/me", userAuth, getMe);

module.exports = router;
