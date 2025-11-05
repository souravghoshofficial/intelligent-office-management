import { app } from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})


app.get("/" , (req, res) => {
    res.send("Hello from Intelligent Office Management backend");
})


import adminRouter from "./routes/adminRoute.js"
import authRoute from "./routes/auth.js"

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoute);


