const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Register User
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Check if all the fields are filled
  if (!firstName || !lastName || !email || !password || !role) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    // Generate token and store it in a cookie
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie by preventing client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * Login User
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User does not exist");
  }

  // Compare passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate token
    const token = generateToken(user._id);

    // Set token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure the cookie
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send response with user details and token
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token, // Send token in response (optional)
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = loginUser;

/**
 * Logout User
 */

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
  });

  res.status(200).json({ message: "User logged out" });
});

/**
 * Get Me
 */

const getMe = asyncHandler(async (req, res) => {
  const { _id, firstName, email} = await User.findById(req.user.id);

  res.status(200).json({
    _id, firstName, email
  });
});

/**
 * Generate Token
 */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
