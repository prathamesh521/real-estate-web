const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {

    // Check if token is in cookies
    const token = req.cookies.token; // Assuming 'jwt' is the name of the cookie storing the token
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is stored in .env

    // Find the user associated with the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    // Attach the user to the request object
    req.user = user;
    console.log(user)
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = {protect};
