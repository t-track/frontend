import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LiveDataProvider } from './components/LiveDataProvider';
import Layout from './components/Layout';
import EventsList from './pages/EventsList';
import EventDetails from './pages/EventDetails';
import RiderProfile from './pages/RiderProfile';
import HorseProfile from './pages/HorseProfile';
import Search from './pages/Search';
import RidersList from './pages/RidersList';
import HorsesList from './pages/HorsesList';
import CategoryResults from './pages/CategoryResults';

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
    }
  }, []);

  return (
    <LiveDataProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/rider/:id" element={<RiderProfile />} />
            <Route path="/horse/:id" element={<HorseProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/riders" element={<RidersList />} />
            <Route path="/horses" element={<HorsesList />} />
            <Route path="/event/:eventId/category/:categoryId" element={<CategoryResults />} />
          </Routes>
        </Layout>
      </Router>
    </LiveDataProvider>
  );
}

export default App;