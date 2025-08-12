import React, { useEffect, useState } from 'react';
import { Moon, Sun, ExternalLink, Smartphone, Monitor, Shield, User, LogOut, Plus, Edit, Trash2, Calendar, Image, MapPin, Type, Save, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { createEvent, updateEvent, deleteEvent, getCoverImages, fetchEvents } from '../services/api';
import { Event } from '../types';
import LoginModal from '../components/Auth/LoginModal';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode, isPWA, apiUrl, liveApiKey, setLiveApiKey, historyApiKey, setHistoryApiKey, eventApiKey, setEventApiKey } = useApp();
  const { user, userProfile, logout, isAdmin } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [customEvents, setCustomEvents] = React.useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [editingEvent, setEditingEvent] = React.useState<Event | null>(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(5);
  const [eventForm, setEventForm] = React.useState({
    eventID: '',
    name: '',
    startTime: '',
    endTime: '',
    subscriptionDeadline: '',
    backgroundImage: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(apiUrl);
        // sort events by the date
        data.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        console.log(data)
        setCustomEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const coverImages = getCoverImages();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setEventForm( {
      eventID: '',
      name: '',
      startTime: '',
      endTime: '',
      backgroundImage: coverImages[0].url,
      subscriptionDeadline: '',
      location: '',
      description: ''
    } );
    setShowEventModal(true);
    setError('');
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      eventID: event.eventID,
      name: event.name,
      startTime: event.startTime.slice(0, 16), // Format for datetime-local input
      endTime: event.endTime.slice(0, 16), // Format for datetime-local input
      backgroundImage: event.backgroundImage,
      location: event.location,
      subscriptionDeadline: event.subscriptionDeadline,
      description: ''
    });
    setError('');
    setShowEventModal(true);
  };

  const handleSaveEvent = async () => {
    if (!eventForm.eventID || !eventForm.name || !eventForm.startTime) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const eventData = {
        ...eventForm,
        startTime: new Date(eventForm.startTime).toISOString(),
        endTime: new Date(eventForm.endTime).toISOString(),
        subscriptionDeadline: new Date(eventForm.subscriptionDeadline).toISOString(),
      };

      if (editingEvent) {
        await updateEvent(editingEvent.eventID, eventData, apiUrl);
      } else {
        await createEvent(apiUrl, eventData);
      }

      // Refresh the events list
      const data = await fetchEvents(apiUrl);
      setCustomEvents(data);
      setShowEventModal(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventID: string) => {
    console.log("deleting", eventID)
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
    
    try {
      var neweEents = await deleteEvent(eventID, apiUrl);
      setCustomEvents( neweEents );
    } catch (err: any) {
      console.error('Failed to delete event:', err);
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
              <label htmlFor="liveApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live API Key
              </label>
              <input
                type="url"
                id="liveApiKey"
                value={liveApiKey}
                onChange={(e) => setLiveApiKey(e.target.value)}
                placeholder="https://api.t-tracksystem.com/live"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter the API key for the live race data API endpoint
              </p>
            </div>
            <div>
              <label htmlFor="eventApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event API Key
              </label>
              <input
                type="url"
                id="eventApiKey"
                value={eventApiKey}
                onChange={(e) => setEventApiKey(e.target.value)}
                placeholder="https://api.t-tracksystem.com/live"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter the API key for the event race data API endpoint
              </p>
            </div>
            <div>
              <label htmlFor="historyApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                History API Keys
              </label>
              <input
                type="url"
                id="historyApiKey"
                value={historyApiKey}
                onChange={(e) => setHistoryApiKey(e.target.value)}
                placeholder="https://api.t-tracksystem.com/live"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Enter the API key for the history data API endpoint
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

        {/* Event Management */}
        {isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Event Management</h2>
              <button
                onClick={openCreateModal}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </button>
            </div>
            
            <div className="mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm text-amber-800 dark:text-amber-200 font-medium">Administrator Only</span>
              </div>
            </div>

            {customEvents.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No custom events created yet</p>
                <p className="text-sm">Click "Create Event" to add your first event</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customEvents.map((event) => (
                  <div key={event.eventID + event.name} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={event.backgroundImage}
                        alt={event.name}
                        className="w-16 h-10 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.onerror = null; // Prevent looping
                          e.currentTarget.src = '/no-image-icon-6.png'; // Path to your fallback image
                        }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{event.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          {/* <span>ID: {event.id}</span> */}
                          <span>{new Date(event.startTime).toLocaleDateString()}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="p-2 text-red-600 hover:text-red-700 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isAdmin && user && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Administrator Access Required</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Event management and API configuration settings are only available to administrators.
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

      {/* Event Creation/Edit Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Event ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event ID *
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  maxLength={7}
                  value={eventForm.eventID}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setEventForm({ ...eventForm, eventID: value });
                  }}
                  disabled={!!editingEvent}
                  placeholder="e.g., 340001"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                />
                {editingEvent && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Event ID cannot be changed</p>
                )}
              </div>

              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={eventForm.name}
                  onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  placeholder="e.g., Summer Endurance Championship"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  value={eventForm.startTime}
                  onChange={(e) => { 
                    setEventForm({ ...eventForm, startTime: e.target.value,  endTime: e.target.value  } );
                  } }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  value={eventForm.endTime}
                  onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Submission deadline Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Submission Deadline *
                </label>
                <input
                  type="datetime-local"
                  value={eventForm.subscriptionDeadline}
                  onChange={(e) => setEventForm({ ...eventForm, subscriptionDeadline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="e.g., Tuscany Hills, Italy"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Cover Image Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {coverImages.slice(0, visibleImagesCount).map((image) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setEventForm({ ...eventForm, backgroundImage: image.url })}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                        eventForm.backgroundImage === image.url
                          ? 'border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-800'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-20 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                        <span className="text-white text-xs p-2 font-medium">{image.name}</span>
                      </div>
                      {eventForm.backgroundImage === image.url && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                { visibleImagesCount < coverImages.length && (
                  <div className="mt-3 flex justify-center">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-600 text-white rounded shadow hover:bg-gray-700 transition"
                      onClick={() => setVisibleImagesCount((c: number) => Math.min(c + 5, coverImages.length))}
                    >
                      Load More Images
                    </button>
                  </div>
                ) }
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the event..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                disabled={loading}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingEvent ? 'Update Event' : 'Create Event'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;