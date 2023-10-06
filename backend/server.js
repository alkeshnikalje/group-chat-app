require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./util/database");
const User = require("./models/user");
const userRouter = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
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
