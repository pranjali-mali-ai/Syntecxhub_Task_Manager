import { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';
import {
  FiPlus,
  FiClipboard,
  FiList,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiCheck,
} from 'react-icons/fi';

// --- Helper: Get greeting ---
const getGreeting = () => 'Welcome';

// --- Empty State SVG Illustration ---
const EmptyIllustration = () => (
  <svg
    className="w-32 h-32 mx-auto mb-6 animate-float"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Clipboard body */}
    <rect
      x="25"
      y="15"
      width="70"
      height="90"
      rx="8"
      fill="white"
      stroke="#93C5FD"
      strokeWidth="2"
    />
    {/* Clipboard top */}
    <rect
      x="35"
      y="10"
      width="50"
      height="10"
      rx="3"
      fill="#BFDBFE"
      stroke="#93C5FD"
      strokeWidth="2"
    />
    {/* Lines on paper */}
    <line x1="38" y1="40" x2="82" y2="40" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="52" x2="75" y2="52" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="64" x2="82" y2="64" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    <line x1="38" y1="76" x2="68" y2="76" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
    {/* Checkmark circle */}
    <circle cx="90" cy="30" r="16" fill="#22C55E" />
    <circle cx="90" cy="30" r="14" fill="#16A34A" />
    <path
      d="M84 30L88 34L96 26"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Plus icon */}
    <circle cx="60" cy="50" r="28" fill="#3B82F6" fillOpacity="0.1" />
  </svg>
);

// ---------- Stat Card Component ----------
const StatCard = ({ icon: Icon, label, count, bgColor, iconColor, hoverColor }) => (
  <div className={`stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-default ${hoverColor}`}>
    <div className="flex items-center justify-between mb-3">
      <div
        className={`flex items-center justify-center w-11 h-11 rounded-xl ${bgColor}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-2xl font-bold text-gray-900 mt-0.5">{count}</p>
  </div>
);

// ---------- Dashboard Component ----------
const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, task: null });

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

  // Prompt confirm modal before deleting
  const handleDeleteTask = (task) => {
    setDeleteConfirm({ isOpen: true, task });
  };

  // Execute delete after confirmation
  const confirmDeleteTask = async () => {
    const task = deleteConfirm.task;
    if (!task) return;
    setDeleteConfirm({ isOpen: false, task: null });
    try {
      await api.delete(`/tasks/${task._id}`);
      await fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const cancelDeleteTask = () => {
    setDeleteConfirm({ isOpen: false, task: null });
  };

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;
  const pendingTasks = totalTasks - completedTasks;

  // Recent activity derived from tasks (sorted by updatedAt descending)
  const recentActivity = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, 5)
      .map((task) => {
        let action = 'Updated task';
        if (task.status === 'Completed') action = 'Completed';
        else if (task.status === 'In Progress') action = 'Started working on';
        return { action, title: task.title, id: task._id };
      });
  }, [tasks]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ===== Dashboard Header ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              <span className="wave">👋</span> {getGreeting()}, {user?.name?.split(' ')[0] || 'Rahul'}!
            </h1>
            <p className="text-gray-500 mt-1.5 flex items-center gap-1.5">
              <FiTrendingUp className="w-4 h-4" />
              You have{' '}
              <span className="font-semibold text-gray-700">{pendingTasks}</span>{' '}
              pending task{pendingTasks !== 1 ? 's' : ''} today.
            </p>
          </div>
          <button
            onClick={handleAddTask}
            className="btn-pulse group inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Add Task
          </button>
        </div>

        {/* ===== Statistics Cards ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FiList}
            label="Total Tasks"
            count={totalTasks}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
            hoverColor="hover:border-blue-200"
          />
          <StatCard
            icon={FiClock}
            label="To Do"
            count={todoTasks}
            bgColor="bg-amber-100"
            iconColor="text-amber-600"
            hoverColor="hover:border-amber-200"
          />
          <StatCard
            icon={FiTrendingUp}
            label="In Progress"
            count={inProgressTasks}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
            hoverColor="hover:border-purple-200"
          />
          <StatCard
            icon={FiCheckCircle}
            label="Completed"
            count={completedTasks}
            bgColor="bg-green-100"
            iconColor="text-green-600"
            hoverColor="hover:border-green-200"
          />
        </div>

        {/* ===== Recent Activity Section ===== */}
        {tasks.length > 0 && (
          <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div
                  key={`${activity.id}-${idx}`}
                  className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5 ${
                      activity.action === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <FiCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">
                        {activity.action === 'Completed'
                          ? '✓ Completed'
                          : activity.action === 'Started working on'
                          ? '▶ Started'
                          : '✏️ Updated'}
                      </span>{' '}
                      <span className="text-gray-900 font-medium truncate">
                        {activity.title}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Task List / Empty State ===== */}
        <div className="mt-2">
          {loading ? (
            <Loader />
          ) : tasks.length === 0 ? (
            /* --- Modern Empty State --- */
            <div className="text-center py-16 px-4">
              <EmptyIllustration />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start by creating your first task. Stay organized and track your
                progress!
              </p>
              <button
                onClick={handleAddTask}
                className="btn-pulse group inline-flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Create Your First Task
              </button>
            </div>
          ) : (
            /* --- Tasks Grid --- */
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FiClipboard className="w-5 h-5 text-blue-600" />
                  All Tasks ({totalTasks})
                </h2>
              </div>
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
            </>
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDeleteTask}
        onConfirm={confirmDeleteTask}
        title="Delete Task?"
        message={`Are you sure you want to delete "${deleteConfirm.task?.title || ''}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
};

export default Dashboard;

