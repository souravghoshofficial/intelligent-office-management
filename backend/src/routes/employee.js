import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

import { changePassword, applyLeave, getMyLeaves } from "../controllers/employee.js";

const router = Router();

router.route("/:id/change-password").put(changePassword);
router.route("/apply-for-leave").post(applyLeave);
router.route("/get-my-leaves").get(getMyLeaves);

export default router;