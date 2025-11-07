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
    const { name, email, password, phone, joining_date, role, position, department_id } = req.body;

    // 1. Check if user already exists
    const existing = await sql`
      SELECT * FROM employees WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return res.status(400).json({ error: "Employee with this email already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert new employee
    const result = await sql`
      INSERT INTO employees (
        name, email, password, phone, joining_date, role, position, department_id, status
      )
      VALUES (
        ${name}, ${email}, ${hashedPassword}, ${phone}, ${joining_date}, ${role}, ${position}, ${department_id}, true
      )
      RETURNING id, name, email, role;
    `;

    const newEmployee = result[0];

    // 4. Send success response
    return res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });

  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
