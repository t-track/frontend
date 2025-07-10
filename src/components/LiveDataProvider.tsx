import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Rider, Event } from '../types';

interface LiveDataContextType {
  isConnected: boolean;
  lastUpdated: Date | null;
  error: string | null;
  retryConnection: () => void;
}

const LiveDataContext = createContext<LiveDataContextType | undefined>(undefined);

interface LiveDataProviderProps {
  children: React.ReactNode;
}

export const LiveDataProvider: React.FC<LiveDataProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    try {
      // Try to fetch data to check if API is available
      await apiService.fetchLiveResults();
      setIsConnected(true);
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Connection failed');
    }
  };

  const retryConnection = () => {
    setError(null);
    checkConnection();
  };

  useEffect(() => {
    // Check connection on mount
    checkConnection();

    // Set up periodic connection checks
    const interval = setInterval(checkConnection, 60000); // Check every minute

    return () => {
      clearInterval(interval);
      apiService.stopPolling();
    };
  }, []);

  const value: LiveDataContextType = {
    isConnected,
    lastUpdated,
    error,
    retryConnection,
  };

  return (
    <LiveDataContext.Provider value={value}>
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveDataContext = () => {
  const context = useContext(LiveDataContext);
  if (context === undefined) {
    throw new Error('useLiveDataContext must be used within a LiveDataProvider');
  }
  return context;
};