import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; 
const COOKIE_EXPIRES_DAYS = 7;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 2. Find user
    const result = await sql`SELECT * FROM employees WHERE email = ${email}`;
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];

    const department_name = await sql`SELECT department_name FROM departments WHERE id = ${user.department_id}`
    const department = department_name[0];

    // 3. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 5. Set JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only over HTTPS in production
      sameSite: "strict",
      maxAge: COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Success response (exclude password)
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user?.phone || "",
        position: user.position,
        department,
        role: user.role,
        status: user.status
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};


export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    // Fetch user details
    const userResult = await sql`
      SELECT id, name, email, phone, position, role, status, department_id
      FROM employees
      WHERE id = ${userId};
    `;

    if (userResult.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const user = userResult[0];

    // Fetch department name
    const departmentResult = await sql`
      SELECT department_name FROM departments WHERE id = ${user.department_id};
    `;
    const department = departmentResult[0]?.department_name || null;

    // Send response
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        position: user.position,
        department,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Error fetching current user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



