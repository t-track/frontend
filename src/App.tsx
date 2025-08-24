import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CategoryDetail from './pages/CategoryDetail';
import Riders from './pages/Riders';
import Horses from './pages/Horses';
import History from './pages/History';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/events/:eventid" element={<EventDetail />} />
            <Route path="/events/:eventId/categories/:categoryName" element={<CategoryDetail />} />
            <Route path="/riders" element={<Riders />} />
            <Route path="/riders/:id" element={<Riders />} />
            <Route path="/horses" element={<Horses />} />
            <Route path="/horses/:id" element={<Horses />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <PWAInstallPrompt />
      </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;