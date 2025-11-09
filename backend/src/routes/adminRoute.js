import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { createDepartment, createEmployee, getAllLeaves } from "../controllers/admin.js";

const router = Router();

router.route("/create-employee").post(authorizeRoles("admin"), createEmployee)
router.route("/create-department").post(authorizeRoles("admin"), createDepartment)
router.route("/leaves").get(authorizeRoles("admin"), getAllLeaves);


export default router;