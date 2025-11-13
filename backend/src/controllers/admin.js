import bcrypt from "bcrypt";
import {sql} from "../config/db.js";


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


export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees with department name
    const employees = await sql`
      SELECT 
        e.id id,
        e.name name,
        e.email email,
        e.phone phone,
        e.position position,
        e.role role,
        e.status status,
        d.department_name department_name
      FROM employees e
      LEFT JOIN departments d
      ON e.department_id = d.id
      ORDER BY e.id ASC;
    `;

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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


export const getLeaveById = async (req, res) => {
  try {
    const { leave_id } = req.params;

    if (!leave_id) {
      return res.status(400).json({ error: "Leave ID is required." });
    }

    const leave = await sql`
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
      WHERE l.id = ${leave_id}
      LIMIT 1;
    `;

    if (leave.length === 0) {
      return res.status(404).json({ error: "Leave record not found." });
    }

    return res.status(200).json({
      success: true,
      leave: leave[0],
    });
  } catch (err) {
    console.error("Error fetching leave by ID:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const approveLeave = async (req, res) => {
  try {
    const { leave_id } = req.params; 

    // Validate input
    if (!leave_id || leave_id.trim() === "") {
      return res.status(400).json({ error: "Leave ID is required." });
    }

    // Fetch the leave record
    const existingLeave = await sql`
      SELECT * FROM leaves WHERE id = ${leave_id};
    `;

    if (existingLeave.length === 0) {
      return res.status(404).json({ error: "Leave request not found." });
    }

    const leave = existingLeave[0];
    if (leave.status === "approved") {
      return res.status(400).json({ error: "Leave is already approved." });
    }
    if (leave.status === "rejected") {
      return res.status(400).json({ error: "Cannot approve a rejected leave." });
    }

    // Update the leave status
    const result = await sql`
      UPDATE leaves
      SET status = 'approved', updated_at = NOW()
      WHERE id = ${leave_id}
      RETURNING id, employee_id, leave_type, start_date, end_date, status, updated_at;
    `;

    // Return success response
    return res.status(200).json({
      message: "Leave request approved successfully.",
      leave: result[0],
    });
  } catch (err) {
    console.error("Error approving leave:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const rejectLeave = async (req, res) => {
  try {
    const { leave_id } = req.params; 

    // Validate input
    if (!leave_id || leave_id.trim() === "") {
      return res.status(400).json({ error: "Leave ID is required." });
    }

    // Check if leave exists
    const existingLeave = await sql`
      SELECT * FROM leaves WHERE id = ${leave_id};
    `;

    if (existingLeave.length === 0) {
      return res.status(404).json({ error: "Leave request not found." });
    }

    const leave = existingLeave[0];
    if (leave.status === "rejected") {
      return res.status(400).json({ error: "Leave is already rejected." });
    }
    if (leave.status === "approved") {
      return res.status(400).json({ error: "Cannot reject an already approved leave." });
    }

    // Update the leave status
    const result = await sql`
      UPDATE leaves
      SET status = 'rejected', updated_at = NOW()
      WHERE id = ${leave_id}
      RETURNING id, employee_id, leave_type, start_date, end_date, status, updated_at;
    `;

    // Return success response
    return res.status(200).json({
      message: "Leave request rejected successfully.",
      leave: result[0],
    });
  } catch (err) {
    console.error("Error rejecting leave:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Check employee exists
    const employee = await sql`
      SELECT id, status FROM employees WHERE id = ${id}
    `;

    if (employee.length === 0) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const currentStatus = employee[0].status;
    const newStatus = !currentStatus;

    // Update status
    const updated = await sql`
      UPDATE employees
      SET status = ${newStatus}
      WHERE id = ${id}
      RETURNING id, name, email, status;
    `;

    return res.status(200).json({
      message: `Employee status updated to ${newStatus ? "Active" : "Inactive"}`,
      employee: updated[0],
    });

  } catch (err) {
    console.error("Error toggling employee status:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




