import "dotenv/config";
import express from "express";
import { pool } from "./config/MySqlConnect";
import UsersRoutes from "./users/infrastructure/routes/UserRoutes";

const app = express();
app.use(express.json());

async function startServer() {
    try {

    await pool.query("SELECT 1");

    console.log("Database connection established🥵🥵");

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running on port " + (process.env.PORT || 3000));
    });

    app.use("/users",UsersRoutes);

    } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); 
    }

app.get("/health", async (_, res) => {
    try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "OK" });
    } catch (error) {
    res.status(500).json({ status: "DB DOWN" });
    }
});





}

startServer();