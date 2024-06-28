const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
require("dotenv").config();

//CRUD
app.get("/", (req, res) => {
  res.send("Welcome to our chat app");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`Running server on port: ${port}`);
});

mongoose
  .connect(uri, {
    //useNewURLParser: true,
    //useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB failed ", error.message);
  });
