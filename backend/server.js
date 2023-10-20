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
const userGroupRouter = require("./routes/usergroup");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      `http://localhost:${process.env.CLIENT}`,
      `http://127.0.0.1:${process.env.CLIENT}`,
    ],
  },
});

// Define Socket.io logic here (events, namespaces, etc.)
io.on("connection", (socket) => {
  console.log("A user connected " + socket.id);

  socket.on("join", (groupId) => {
    // Join a specific group room
    console.log(`user ${socket.id} joined group ${groupId}`);
    socket.join(groupId);
  });

  socket.on("chatMessage", (data) => {
    // Handle chat message events
    if (data.groupId !== data.groupId) return;
    socket.to(data.groupId).emit("message", data); // Broadcast the message to all connected clients
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

User.hasMany(Chat);
Group.belongsToMany(User, {
  through: UserGroup,
});
User.belongsToMany(Group, {
  through: UserGroup,
});
Group.hasMany(Chat);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Define API routes
app.use("/api/user", userRouter);
app.use("/api/user", chatRouter);
app.use("/api/user", groupRouter);
app.use("/api/user", userGroupRouter);

server.listen(process.env.PORT, () => {
  console.log("Server running");
});
