import { app } from "./app.js";
import { verifyToken } from "./middlewares/authMiddleware.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

app.get("/" , (req, res) => {
    res.json({
        message: "Server is running..."
    })
})

import adminRouter from "./routes/adminRoute.js"
import authRoute from "./routes/auth.js"
import employeeRouter from "./routes/employee.js"
import departmentRouter from "./routes/department.js"

app.use("/api/auth", authRoute);
app.use("/api/admin", verifyToken, adminRouter);
app.use("/api/employee" , verifyToken, employeeRouter);
app.use("/api/departments", verifyToken, departmentRouter);

// import { app } from "./app.js";
// import { verifyToken } from "./middlewares/authMiddleware.js";

// import adminRouter from "./routes/adminRoute.js";
// import authRoute from "./routes/auth.js";
// import employeeRouter from "./routes/employee.js";
// import departmentRouter from "./routes/department.js";

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running..." });
// });

// app.use("/api/auth", authRoute);
// app.use("/api/admin", verifyToken, adminRouter);
// app.use("/api/employee", verifyToken, employeeRouter);
// app.use("/api/departments", verifyToken, departmentRouter);

// // ❗ Export the Express app instead of listening on a port
// export default app;
