import express from "express";
import { signup, home } from "../controllers/authContollers.js";

const router = express.Router();

router.get("/", home);
// router.post("/login");
router.post("/signup", signup);
// router.post("/logout");

export default router;
