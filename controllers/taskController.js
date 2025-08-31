import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, email, time } = req.body;
    if (!title || !email || !time) {
      return res.status(400).json({ error: "title, email, and time are required" });
    }
    const task = await Task.create({ title, email, time });
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (_req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task marked as completed", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
