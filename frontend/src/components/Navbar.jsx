import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleDropdownItem = (action) => {
    setIsDropdownOpen(false);
    if (action === 'profile') {
      // Profile action - could navigate to profile page
      // navigate('/profile');
    } else if (action === 'logout') {
      handleLogout();
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="12" y2="17" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">TaskManager</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>

            {/* Notification Bell */}
            <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full animate-badge">
                3
              </span>
            </button>

            {/* User Dropdown */}
            <div className="relative pl-6 border-l border-gray-200" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full">
                  <span className="text-sm font-semibold text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="hidden lg:inline">{user?.name || 'User'}</span>
                <FiChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDropdownItem('profile')}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FiUser className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleDropdownItem('logout')}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu + Notification */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="relative p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full animate-badge">
                3
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
            >
              Dashboard
            </Link>

            <div className="border-t border-gray-100 pt-3">
              {/* User Info in mobile */}
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full">
                  <span className="text-sm font-semibold text-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || ''}</p>
                </div>
              </div>

              {/* Mobile Profile Option */}
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <FiUser className="w-4 h-4" />
                Profile
              </button>

              {/* Mobile Logout */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

