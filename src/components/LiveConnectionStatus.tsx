import React from 'react';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useLiveDataContext } from './LiveDataProvider';
import { useDarkMode } from '../hooks/useDarkMode';

const LiveConnectionStatus: React.FC = () => {
  const { isConnected, lastUpdated, error, retryConnection } = useLiveDataContext();
  const { isDarkMode } = useDarkMode();

  if (!error && isConnected) {
    return (
      <div className={`flex items-center space-x-2 text-sm ${
        isDarkMode ? 'text-green-400' : 'text-green-600'
      }`}>
        <Wifi className="h-4 w-4" />
        <span>Live</span>
        {lastUpdated && (
          <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
            • Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center space-x-2 text-sm ${
        isDarkMode ? 'text-red-400' : 'text-red-600'
      }`}>
        <AlertCircle className="h-4 w-4" />
        <span>Connection Error</span>
        <button
          onClick={retryConnection}
          className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
            isDarkMode 
              ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400' 
              : 'bg-red-100 hover:bg-red-200 text-red-700'
          }`}
        >
          <RefreshCw className="h-3 w-3" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 text-sm ${
      isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
    }`}>
      <WifiOff className="h-4 w-4" />
      <span>Connecting...</span>
    </div>
  );
};

export default LiveConnectionStatus;