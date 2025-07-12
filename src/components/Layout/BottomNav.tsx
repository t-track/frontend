import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, History, Settings } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const BottomNav: React.FC = () => {
  const { isPWA } = useApp();
  const location = useLocation();

  if (!isPWA) return null; // Only show in PWA mode

  const navItems = [
    { path: '/', icon: Home, label: 'Events' },
    { path: '/riders', icon: Users, label: 'Riders' },
    { path: '/horses', icon: Trophy, label: 'Horses' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-padding-bottom">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;