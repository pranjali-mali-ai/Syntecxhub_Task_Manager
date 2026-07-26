import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Loader from '../components/Loader';
import { FiPlus, FiClipboard } from 'react-icons/fi';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Open modal for creating a new task
  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // Open modal for editing an existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // Save task (create or update)
  const handleSaveTask = async (formData) => {
    if (editingTask) {
      await api.put(`/tasks/${editingTask._id}`, formData);
    } else {
      await api.post('/tasks', formData);
    }
    await fetchTasks();
  };

  // Delete task with confirmation
  const handleDeleteTask = async (task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${task._id}`);
      await fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header / Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Manage your tasks and stay organized
            </p>
          </div>
          <button
            onClick={handleAddTask}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            <FiPlus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 font-medium">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalTasks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 font-medium">To Do</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{todoTasks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 font-medium">In Progress</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressTasks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{completedTasks}</p>
          </div>
        </div>

        {/* Task List */}
        <div className="mt-2">
          {loading ? (
            <Loader />
          ) : tasks.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <FiClipboard className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Get started by creating your first task. Stay organized and track
                your progress!
              </p>
              <button
                onClick={handleAddTask}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
              >
                <FiPlus className="w-5 h-5" />
                Create Your First Task
              </button>
            </div>
          ) : (
            /* Tasks Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;

