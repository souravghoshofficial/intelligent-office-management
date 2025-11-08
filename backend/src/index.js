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

app.use("/api/auth", authRoute);
app.use("/api/admin", verifyToken, adminRouter);
app.use("/api/employee" , verifyToken, employeeRouter);


