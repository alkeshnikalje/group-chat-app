// const UserGroup = require("../models/usergroup");

// exports.getAdmin = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const userWhoBelongsToGroup = await UserGroup.findOne({
//       where: { userId, groupId: req.params.groupId },
//     });
//     return res.json({ success: true, userWhoBelongsToGroup });
//   } catch (err) {
//     return res.status(500).json({ success: false, msg: err.message });
//   }
// };
