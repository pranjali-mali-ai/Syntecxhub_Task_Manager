const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// @desc Register User
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Login User
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        success: true,
        message: "Login successful",
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get Logged-in User
// @route GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};