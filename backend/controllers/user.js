const User = require("../models/user");
const bcrypt = require("bcrypt");
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
    return res.json({ success: true, msg: "signup successfull", newUser });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
