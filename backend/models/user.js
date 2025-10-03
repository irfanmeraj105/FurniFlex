const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      enum: ["user", "admin"],
      default: "user",
      type: String,
    },
  },
  { timestamps: true }
);

// creating the model for the user

const User = mongoose.model("User", userSchema);

// exporting the user model

module.exports = User;
