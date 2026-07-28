import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 pointer-events-none" />
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
      />
      {searchQuery && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

