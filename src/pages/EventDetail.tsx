import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Trophy, ArrowLeft, ExternalLink } from 'lucide-react';
import { Event, Category } from '../types';
import { fetchEventById, fetchCategories } from '../services/api';
import LiveScoreboard from '../components/LiveScoreboard';
import { useApp } from '../contexts/AppContext';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useApp();

  useEffect(() => {
    const loadEventData = async () => {
      console.log("eventid", id)
      if (!id) return;
        console.log("error, eventid not defined")
      try {
        const [eventData, categoriesData] = await Promise.all([
          fetchEventById(apiUrl, id),
          fetchCategories()
        ]);
        
        setEvent(eventData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading event data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h1>
          <Link to="/" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>
      </div>

      <div
        className="h-96 bg-cover bg-center rounded-lg relative mb-8"
        style={{ backgroundImage: `url(${event.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center" style={{ overflowX:"clip" }}>
          <div className="text-center text-white" >
            <div className="mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                event.status === 'live' 
                  ? 'bg-red-500 animate-pulse' 
                  : event.status === 'upcoming' 
                  ? 'bg-emerald-500' 
                  : 'bg-gray-500'
              }`}>
                {event.status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
            <div className="p-6 flex items-center justify-center space-x-6 text-lg" >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(event.startTime).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{new Date(event.startTime).toLocaleTimeString( 'en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                } )}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {event.status === 'live' && apiUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Results</h2>
              <LiveScoreboard apiUrl={apiUrl} eventID={ event.eventID } />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Details</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Start Time</h3>
                <p className="text-gray-600 dark:text-gray-300">{new Date(event.startTime).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">End Time</h3>
                <p className="text-gray-600 dark:text-gray-300">{new Date(event.endTime).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">{event.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Registration Deadline</h3>
                <p className="text-gray-600 dark:text-gray-300">{new Date(event.subscriptionDeadline).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-3">
              {event.categories.map((categoryName) => {
                const category = categories.find(c => c.name === categoryName);
                return (
                  <Link
                    key={categoryName}
                    to={`/events/${event.eventID}/categories/${categoryName}`}
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{categoryName}</h4>
                        {category && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{category.distance}km - {category.description}</p>
                        )}
                      </div>
                      <Trophy className="w-5 h-5 text-amber-500" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a
                href="https://t-tracksystem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <ExternalLink className="w-4 h-4" />
                <span>T-track System</span>
              </a>
              <Link
                to="/riders"
                className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <Users className="w-4 h-4" />
                <span>View All Riders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;