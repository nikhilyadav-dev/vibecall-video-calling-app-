import express from "express";
import { signup, home, login, logout } from "../controllers/authContollers.js";
import { isLoggedIn } from "../middleware/isLoggedin.js";

const router = express.Router();

router.get("/", home);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", isLoggedIn, logout);

export default router;
