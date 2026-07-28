import { FiX, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', confirmColor = 'red' }) => {
  if (!isOpen) return null;

  const confirmBtnColor =
    confirmColor === 'red'
      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>

          {/* Icon */}
          <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
            <FiAlertTriangle className="w-7 h-7 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title || 'Delete Task?'}
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-500 mb-6">
            {message || 'This action cannot be undone.'}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all shadow-sm ${confirmBtnColor}`}
            >
              <FiTrash2 className="w-4 h-4" />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

