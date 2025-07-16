import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isPWA: boolean;
  liveApiUrl: string;
  setLiveApiUrl: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [liveApiUrl, setLiveApiUrl] = useState('https://api.raceresult.com/345604/y');
  const [eventApiUrl, setEventApiUrl] = useState('https://api.raceresult.com/345604/y');
  const [futureEventApiUrl, setFutureEventApiUrl] = useState('https://api.raceresult.com/345604/y');

  useEffect(() => {
    // Check if running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsPWA(isStandalone);

    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider value={{
      darkMode,
      toggleDarkMode,
      isPWA,
      liveApiUrl,
      setLiveApiUrl
    }}>
      {children}
    </AppContext.Provider>
  );
};