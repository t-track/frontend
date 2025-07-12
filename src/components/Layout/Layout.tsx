import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import { useApp } from '../../contexts/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isPWA } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className={`${isPWA ? 'pb-20' : 'pb-4'}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;