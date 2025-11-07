import bcrypt from "bcrypt";
import {sql} from "../config/db.js"

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const result = await sql`
      SELECT * FROM employees WHERE email = ${email}
    `;

    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result[0];

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Success
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


