const routes = require("express").Router();

const { loginUser, registerUser, getMe } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/me", protect, getMe);



module.exports = routes;
