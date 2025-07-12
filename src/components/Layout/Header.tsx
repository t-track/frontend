import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Settings, ExternalLink, Menu, X, User, LogOut } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../Auth/LoginModal';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, isPWA } = useApp();
  const { user, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  if (isPWA) return null; // Hide header in PWA mode

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">T-track</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
              Events
            </Link>
            <Link to="/riders" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
              Riders
            </Link>
            <Link to="/horses" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
              Horses
            </Link>
            <Link to="/history" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
              History
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Settings
            </Link>
          </nav>

          {/* Mobile menu button
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div> */}

          <div className="flex items-center space-x-4">
            <a
              href="https://t-tracksystem.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {userProfile?.displayName || user.email}
                  {userProfile?.isAdmin && <span className="text-emerald-600 ml-1">(Admin)</span>}
                </span>
                <button onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => setLoginModalOpen(true)} className="hidden md:flex text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/riders"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Riders
            </Link>
            <Link
              to="/horses"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Horses
            </Link>
            <Link
              to="/history"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              {user ? (
                <div className="px-3 py-2">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {userProfile?.displayName || user.email}
                    {userProfile?.isAdmin && <span className="text-emerald-600 ml-1">(Admin)</span>}
                  </div>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700 text-sm">
                    Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }} className="block px-3 py-2 text-emerald-600 hover:text-emerald-700">
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default Header;