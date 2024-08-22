const routes = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const { loginUser, registerUser, getMe } = require("../controllers/userControllers");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/me", getMe);



module.exports = routes;
