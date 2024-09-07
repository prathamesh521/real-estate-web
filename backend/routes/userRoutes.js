const routes = require("express").Router();

const { loginUser, registerUser, getMe, logoutUser } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/logout", logoutUser);
routes.get("/me", protect, getMe);



module.exports = routes;
