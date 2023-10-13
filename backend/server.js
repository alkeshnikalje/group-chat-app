require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./util/database");
const User = require("./models/user");
const userRouter = require("./routes/user");
const Chat = require("./models/chat");
const chatRouter = require("./routes/chat");
const Group = require("./models/group");
const UserGroup = require("./models/usergroup");
const groupRouter = require("./routes/group");
const app = express();
app.use(express.json());
app.use(cors());

User.hasMany(Chat);
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

app.use("/api/user", userRouter);
app.use("/api/user", chatRouter);
app.use("/api/user", groupRouter);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server running`);
});
