import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { createEmployee, getAllLeaves, approveLeave, rejectLeave } from "../controllers/admin.js";
import { getStats } from "../controllers/stats.js";

const router = Router();

router.route("/create-employee").post(authorizeRoles("admin"), createEmployee)
router.route("/leaves").get(authorizeRoles("admin"), getAllLeaves);
router.route("/leaves/:leave_id/approve").put(authorizeRoles("admin"), approveLeave);
router.route("/leaves/:leave_id/reject").put(authorizeRoles("admin"), rejectLeave);

router.route("/dashboard/stats").get(authorizeRoles("admin"), getStats);


export default router;