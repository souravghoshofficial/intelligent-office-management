import { sql } from "../config/db.js";


export const getAllDepartmentWithEmployeeCount = async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        d.id,
        d.department_name,
        COUNT(e.id) AS employee_count
      FROM departments d
      LEFT JOIN employees e ON e.department_id = d.id
      GROUP BY d.id, d.department_name
      ORDER BY d.department_name ASC;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "No departments found." });
    }

    return res.status(200).json({ departments: result });
  } catch (err) {
    console.error("Error fetching department employee counts:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


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
