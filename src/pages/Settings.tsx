import React from 'react';
import { Moon, Sun, ExternalLink, Smartphone, Monitor, Shield, User, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/Auth/LoginModal';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode, isPWA, liveApiUrl, setLiveApiUrl } = useApp();
  const { user, userProfile, logout, isAdmin } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your T-track experience</p>
      </div>

      <div className="space-y-6">
        {/* Authentication */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account</h2>
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                  {isAdmin ? <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {userProfile?.displayName || user.email}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isAdmin ? 'Administrator' : 'User'} • {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sign in to access additional features and settings.
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {darkMode ? 'Currently using dark theme' : 'Currently using light theme'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                darkMode ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Display Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Display Mode</h2>
          <div className="flex items-center space-x-3">
            {isPWA ? <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> : <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {isPWA ? 'PWA Mode' : 'Browser Mode'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isPWA ? 'Running as installed PWA with bottom navigation' : 'Running in browser with top navigation'}
              </p>
            </div>
          </div>
        </div>

        {/* Live API Configuration */}
        {isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live API Configuration</h2>
          <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-amber-800 dark:text-amber-200 font-medium">Administrator Only</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="liveApiUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live API URL
              </label>
              <input
                type="url"
                id="liveApiUrl"
                value={liveApiUrl}
                onChange={(e) => setLiveApiUrl(e.target.value)}
                placeholder="https://api.t-tracksystem.com/live"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter the URL for the live race data API endpoint
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> The API should return JSON data in the format used by the T-track system.
                Live data will be refreshed every 30 seconds during events.
              </p>
            </div>
          </div>
        </div>
        )}

        {!isAdmin && user && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Administrator Access Required</h3>
            <p className="text-gray-600 dark:text-gray-400">
              API configuration settings are only available to administrators.
            </p>
          </div>
        )}

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">T-track Horse Racing PWA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A progressive web application for tracking horse racing events, riders, and results.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://t-tracksystem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <ExternalLink className="w-4 h-4" />
                <span>T-track System</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default Settings;