import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/isLoggedin.js";
const router = Router();

router.get("/", isLoggedIn, getAllUsers);

export default router;
