import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Users, Search, ExternalLink, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const navItems = [
    { path: '/', icon: Home, label: 'Events' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/riders', icon: Users, label: 'Riders' },
    { path: '/horses', icon: Trophy, label: 'Horses' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b sticky top-0 z-50 transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-blue-600" />
                <h1 className={`text-xl font-bold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>T-track</h1>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className={`flex items-center space-x-2 transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">Main Site</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t md:hidden transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-1 text-xs transition-colors duration-200 ${
                  isActive
                    ? isDarkMode 
                      ? 'text-blue-400 bg-slate-700' 
                      : 'text-blue-600 bg-blue-50'
                    : isDarkMode
                      ? 'text-slate-300 hover:text-blue-400'
                      : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <item.icon className="h-6 w-6 mb-1" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block fixed left-0 top-16 bottom-0 w-64 border-r overflow-y-auto transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-slate-200'
      }`}>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      isActive
                        ? isDarkMode 
                          ? 'bg-slate-700 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Layout;