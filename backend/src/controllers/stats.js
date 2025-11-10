import { sql } from "../config/db.js";

export const getStats = async (req, res) => {
  try {
    // Fetch all counts in a single query batch
    const [employeeCount, departmentCount, leaveStats] = await Promise.all([
      sql`SELECT COUNT(*) AS total_employee FROM employees;`,
      sql`SELECT COUNT(*) AS total_department FROM departments;`,
      sql`
        SELECT
          COUNT(*) AS total_leaves,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) AS total_pending_leaves,
          COUNT(CASE WHEN status = 'approved' THEN 1 END) AS total_approved_leaves,
          COUNT(CASE WHEN status = 'rejected' THEN 1 END) AS total_rejected_leaves
        FROM leaves;
      `
    ]);

    // Merge results into one JSON response
    const stats = {
      total_employee: Number(employeeCount[0].total_employee),
      total_department: Number(departmentCount[0].total_department),
      total_leaves: Number(leaveStats[0].total_leaves),
      total_pending_leaves: Number(leaveStats[0].total_pending_leaves),
      total_approved_leaves: Number(leaveStats[0].total_approved_leaves),
      total_rejected_leaves: Number(leaveStats[0].total_rejected_leaves)
    };

    return res.status(200).json({ success: true, stats });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
