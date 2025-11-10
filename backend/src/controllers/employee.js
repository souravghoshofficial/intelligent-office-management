import bcrypt from "bcrypt";
import {sql} from "../config/db.js";

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params; 
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id; 

    // 1️. Validate input
    if (!oldPassword?.trim() || !newPassword?.trim()) {
      return res
        .status(400)
        .json({ error: "Both old and new passwords are required." });
    }

    // 2️. Ensure employee is changing their own password
    if (userId !== id) {
      return res
        .status(403)
        .json({ error: "Access denied. You can only change your own password." });
    }

    // 3️. Fetch user
    const result = await sql`
      SELECT id, password FROM employees WHERE id = ${id}
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = result[0];

    // 4️. Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect old password." });
    }

    // 5️. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 6️. Update in database
    await sql`
      UPDATE employees
      SET password = ${hashedPassword}
      WHERE id = ${id}
    `;

    // 7️. Success
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



export const applyLeave = async (req, res) => {
  try {
    const {leave_type, description, start_date, end_date } = req.body;
    const employee_id = req.user?.id;

    // 1. Input validation
    if (
      !leave_type?.trim() ||
      !start_date ||
      !end_date
    ) {
      return res.status(400).json({
        error: "Missing required fields: leave_type, start_date, and end_date are mandatory.",
      });
    }

    // 2. Validate date range
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (isNaN(start) || isNaN(end) || end < start) {
      return res.status(400).json({
        error: "Invalid date range. End date must be after start date.",
      });
    }

    // 3. Optional: Check for overlapping leaves
    const overlapping = await sql`
      SELECT id FROM leaves
      WHERE employee_id = ${employee_id}
        AND status IN ('pending', 'approved')
        AND (
          (start_date <= ${end_date} AND end_date >= ${start_date})
        );
    `;

    if (overlapping.length > 0) {
      return res.status(400).json({
        error: "You already have a leave overlapping with this date range.",
      });
    }

    // 4. Insert leave record
    const result = await sql`
      INSERT INTO leaves (
        employee_id, leave_type, description, start_date, end_date, status
      )
      VALUES (
        ${employee_id}, ${leave_type}, ${description || null},
        ${start_date}, ${end_date}, 'pending'
      )
      RETURNING id, leave_type, start_date, end_date, status;
    `;

    const newLeave = result[0];

    // 5. Success
    return res.status(201).json({
      message: "Leave applied successfully. Awaiting approval.",
      leave: newLeave,
    });

  } catch (error) {
    console.error("Error applying for leave:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const result = await sql`
      SELECT 
        id, 
        leave_type, 
        start_date, 
        end_date, 
        created_at
      FROM leaves
      WHERE employee_id = ${employeeId}
      ORDER BY created_at DESC
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "No leave records found." });
    }

    return res.status(200).json({ leaves: result });
  } catch (err) {
    console.error("Error fetching leave records:", err);
    return res.status(500).json({ error: "Failed to fetch leave records." });
  }
};

