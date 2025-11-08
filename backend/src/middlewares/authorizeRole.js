export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized. User not found." });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden. Insufficient permissions." });
      }

      next();
    } catch (err) {
      console.error("Authorization error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
