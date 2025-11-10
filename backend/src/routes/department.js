import express from "express";
import { getAllDepartmentWithEmployeeCount, createDepartment } from "../controllers/department.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = express.Router();

router.route("/").get(authorizeRoles("admin"), getAllDepartmentWithEmployeeCount);
router.route("/").post(authorizeRoles("admin"), createDepartment);

export default router;
