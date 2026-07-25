const Task = require("../models/Task");

// @desc Get all tasks for logged-in user
// @route GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create a new task
// @route POST /api/tasks
// @access Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update a task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Task removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

