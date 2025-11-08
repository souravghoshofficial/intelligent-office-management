import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { changePassword } from "../controllers/employee.js";

const router = Router();

router.route("/:id/change-password").put(changePassword);

export default router;