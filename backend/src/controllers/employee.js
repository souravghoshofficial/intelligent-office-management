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
