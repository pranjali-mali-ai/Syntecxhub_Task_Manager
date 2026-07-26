import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

const statusStyles = {
  'To Do': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
};

const priorityStyles = {
  Low: 'bg-blue-100 text-blue-700',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-700',
};

const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      {/* Title & Actions */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
          {task.title}
        </h3>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusStyles[task.status] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {task.status}
        </span>

        {/* Priority Badge */}
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            priorityStyles[task.priority] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <FiCalendar className="w-4 h-4" />
        <span>{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
};

export default TaskCard;

