import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js"; // ✅ default import

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use router
app.use("/api/tasks", taskRoutes);

mongoose
  .connect("mongodb://localhost:27017/taskmanager")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
