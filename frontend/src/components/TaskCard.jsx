import { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import api from '../services/api';

const statusStyles = {
  'To Do': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-amber-100 text-amber-800',
  Completed: 'bg-green-100 text-green-800',
};

const priorityStyles = {
  Low: 'bg-blue-100 text-blue-700',
  Medium: 'bg-amber-100 text-amber-800',
  High: 'bg-red-100 text-red-700',
};

const formatDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatCreatedDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, isKanban }) => {
  const [isCompleted, setIsCompleted] = useState(task.status === 'Completed');
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleComplete = async (e) => {
    e.stopPropagation();
    if (isToggling) return;
    setIsToggling(true);

    const newStatus = isCompleted ? 'To Do' : 'Completed';
    const previousStatus = isCompleted;

    // Optimistic update
    setIsCompleted(!isCompleted);

    try {
      await api.put(`/tasks/${task._id}`, { status: newStatus });
      if (onToggleComplete) {
        onToggleComplete(task._id, newStatus);
      }
    } catch (err) {
      // Revert
      setIsCompleted(previousStatus);
      console.error('Failed to toggle task:', err);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div
      className={`task-card-hover bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${
        isKanban ? 'text-sm' : ''
      }`}
    >
      {/* Title & Actions */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Completion Toggle */}
          <button
            onClick={handleToggleComplete}
            disabled={isToggling}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted && <FiCheckCircle className="w-3.5 h-3.5" />}
          </button>

          <h3
            className={`font-semibold text-gray-900 leading-tight ${
              isCompleted ? 'line-through text-gray-400' : ''
            } ${isKanban ? 'text-sm' : 'text-base'}`}
          >
            {task.title}
          </h3>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className={`text-gray-500 mb-3 line-clamp-2 ${
            isKanban ? 'text-xs' : 'text-sm'
          } ${isCompleted ? 'line-through text-gray-300' : ''}`}
        >
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
        {/* Status Badge - Only show if not kanban (kanban already shows column) */}
        {!isKanban && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              statusStyles[task.status] || 'bg-gray-100 text-gray-700'
            }`}
          >
            {task.status}
          </span>
        )}

        {/* Priority Badge */}
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            priorityStyles[task.priority] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Dates */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}
        {task.createdAt && (
          <div className="flex items-center gap-1">
            <FiClock className="w-3 h-3" />
            <span>Created: {formatCreatedDate(task.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

