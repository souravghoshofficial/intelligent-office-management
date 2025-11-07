import { Router } from "express";

import { createDepartment, createEmployee } from "../controllers/admin.js";

const router = Router();

router.route("/create-employee").post(createEmployee)
router.route("/create-department").post(createDepartment)


export default router;