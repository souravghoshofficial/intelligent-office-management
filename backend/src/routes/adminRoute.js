import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import {
  createEmployee,
  getAllEmployees,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  toggleEmployeeStatus,
} from "../controllers/admin.js";
import { getStats } from "../controllers/stats.js";

const router = Router();

router.route("/employees").get(authorizeRoles("admin"), getAllEmployees);
router.route("/employees").post(authorizeRoles("admin"), createEmployee);
router.route("/leaves").get(authorizeRoles("admin"), getAllLeaves);
router
  .route("/leaves/:leave_id/approve")
  .put(authorizeRoles("admin"), approveLeave);
router
  .route("/leaves/:leave_id/reject")
  .put(authorizeRoles("admin"), rejectLeave);

router.route("/dashboard/stats").get(authorizeRoles("admin"), getStats);

//

router
  .route("/employee/:id/toggle-status")
  .put(authorizeRoles("admin"), toggleEmployeeStatus);
  router
  .route("/leaves/:leave_id")
  .get(authorizeRoles("admin"), getLeaveById);


export default router;
