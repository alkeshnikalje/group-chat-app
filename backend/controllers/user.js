require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, msg: "all fields are required" });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(403)
        .json({ success: false, msg: "user already exits with this email" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      phoneNumber,
    });
    return res
      .status(201)
      .json({ success: true, msg: "signup successfull", newUser });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "all fields are required" });
    }
    const user = await User.findOne({ where: { email } });
    console.log(user.name);
    if (!user) {
      return res.status(404).json({ success: false, msg: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "password incorrect" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res
      .status(201)
      .json({ success: true, msg: "logged in successfully", token });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByPk(id);
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "phoneNumber"],
    });

    return res.status(200).json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
