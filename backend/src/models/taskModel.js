import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
