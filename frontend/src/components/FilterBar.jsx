const STATUS_OPTIONS = ['All', 'To Do', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];

const FilterBar = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) => {
  const activeStatusClass = (value) =>
    value === statusFilter
      ? 'bg-blue-600 text-white shadow-sm'
      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200';

  const activePriorityClass = (value) =>
    value === priorityFilter
      ? 'bg-blue-600 text-white shadow-sm'
      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200';

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status Filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-medium text-gray-500 mr-1">Status:</span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onStatusChange(opt)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activeStatusClass(opt)}`}
          >
            {opt === 'All' ? 'All' : opt}
          </button>
        ))}
      </div>

      {/* Priority Filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-xs font-medium text-gray-500 mr-1">Priority:</span>
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => onPriorityChange(opt)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${activePriorityClass(opt)}`}
          >
            {opt === 'All' ? 'All' : opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;

