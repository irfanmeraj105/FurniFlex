const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({ name, email, password: hashedPassword });

    // user info (without password)
    const userInfo = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }; // generateToken

    const token = generateToken(user._id, user.role);

    res.status(201).json({ message: "Signup successful", userInfo, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // generate token
    const token = generateToken(user._id, user.role);

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
