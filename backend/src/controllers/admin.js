import bcrypt from "bcrypt";
import {sql} from "../config/db.js";


export const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    // 1. Validate input
    if (!department_name || department_name.trim() === "") {
      return res.status(400).json({ error: "Department name is required" });
    }

    // 2. Check if department already exists
    const existing = await sql`
      SELECT * FROM departments WHERE department_name = ${department_name}
    `;

    if (existing.length > 0) {
      return res.status(400).json({ error: "Department already exists" });
    }

    // 3. Insert new department
    const result = await sql`
      INSERT INTO departments (department_name)
      VALUES (${department_name})
      RETURNING id, department_name;
    `;

    // 4. Respond with success
    return res.status(201).json({
      message: "Department created successfully",
      department: result[0],
    });

  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      joining_date,
      role,
      position,
      department_id,
    } = req.body;

    // 1. Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !joining_date ||
      !role?.trim()
    ) {
      return res.status(400).json({
        error:
          "Missing required fields: name, email, password, joining_date, and role are mandatory.",
      });
    }

    // 2. Normalize and validate role
    const normalizedRole = role.toLowerCase();


    // 3️. Validate phone
    if (phone && isNaN(phone)) {
      return res.status(400).json({ error: "Phone number must be numeric." });
    }

    // 4️. Check if user already exists
    const existing = await sql`
      SELECT id FROM employees WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists." });
    }

    // 5️. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️. Insert new employee
    const result = await sql`
      INSERT INTO employees (
        name, email, password, phone, joining_date, role, position, department_id, status
      )
      VALUES (
        ${name},
        ${email},
        ${hashedPassword},
        ${phone || null},
        ${joining_date},
        ${normalizedRole},
        ${position || null},
        ${department_id || null},
        true
      )
      RETURNING id, name, email, role;
    `;

    const newEmployee = result[0];

    // 7️. Success response
    return res.status(201).json({
      message: "Employee created successfully.",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getAllLeaves = async (req, res) => {
  try {

    // Pagination parameters (default page 1, 10 per page)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    // Fetch paginated results
    const leaves = await sql`
      SELECT 
        l.id,
        l.leave_type,
        l.description,
        l.start_date,
        l.end_date,
        l.status,
        l.created_at,
        e.name AS employee_name,
        e.email AS employee_email,
        e.id AS employee_id
      FROM leaves l
      JOIN employees e ON l.employee_id = e.id
      ORDER BY l.created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;

    // Get total count for pagination info
    const totalResult = await sql`SELECT COUNT(*) FROM leaves;`;
    const total = parseInt(totalResult[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      currentPage: page,
      totalPages,
      totalRecords: total,
      leaves,
    });
  } catch (err) {
    console.error("Error fetching all leaves:", err);
    return res.status(500).json({ error: "Failed to fetch leave records." });
  }
};



