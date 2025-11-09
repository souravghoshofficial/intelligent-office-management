import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { createDepartment, createEmployee, getAllLeaves, approveLeave, rejectLeave } from "../controllers/admin.js";

const router = Router();

router.route("/create-employee").post(authorizeRoles("admin"), createEmployee)
router.route("/create-department").post(authorizeRoles("admin"), createDepartment)
router.route("/leaves").get(authorizeRoles("admin"), getAllLeaves);
router.route("/leaves/:leave_id/approve").put(authorizeRoles("admin"), approveLeave);
router.route("/leaves/:leave_id/reject").put(authorizeRoles("admin"), rejectLeave);


export default router;