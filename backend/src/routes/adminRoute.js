import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { createDepartment, createEmployee } from "../controllers/admin.js";

const router = Router();

router.route("/create-employee").post(authorizeRoles("admin"), createEmployee)
router.route("/create-department").post(authorizeRoles("admin"), createDepartment)


export default router;