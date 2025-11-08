import { Router } from "express";

import { login, logout } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/login").post(login)
router.route("/logout").post(verifyToken, logout)



export default router;