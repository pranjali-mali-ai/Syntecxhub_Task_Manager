import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First', icon: FiArrowDown },
  { value: 'oldest', label: 'Oldest First', icon: FiArrowUp },
  { value: 'dueDate', label: 'Due Date', icon: FiArrowDown },
  { value: 'priority', label: 'Priority', icon: FiArrowUp },
  { value: 'alphabetical', label: 'Alphabetical', icon: FiArrowUp },
];

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
      >
        <selectedOption.icon className="w-4 h-4 text-gray-500" />
        <span>{selectedOption.label}</span>
        <FiChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-fade-in">
          {SORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = sortBy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isSelected
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                {option.label}
                {isSelected && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;

