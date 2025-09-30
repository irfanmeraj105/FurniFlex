const express = require("express");
const connectDB = require("./config/connectDB");
const authroutes = require("./routes/authRoutes");
app = express();
require("dotenv").config();
PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect db
connectDB();

// routes
app.use("/", authroutes);

// server trigger
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
