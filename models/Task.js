import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
     title: { type: String, required: true },
  email: { type: String, required: true },
  time: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})
const Task = mongoose.model("Task", taskSchema);
export default Task;