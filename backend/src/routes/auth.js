import { Router } from "express";

import { login, logout, getCurrentUser } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
router.route("/me").get(verifyToken, getCurrentUser);



export default router;