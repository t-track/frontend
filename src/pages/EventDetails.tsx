import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Trophy, Zap, RefreshCw } from 'lucide-react';
import RiderCard from '../components/RiderCard';
import LiveEventHeader from '../components/LiveEventHeader';
import LiveLeaderboard from '../components/LiveLeaderboard';
import { mockEvents } from '../data/mockData';
import { useDarkMode } from '../hooks/useDarkMode';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode } = useDarkMode();

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="md:ml-64">
        <div className="text-center py-12">
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Event Not Found
          </h1>
          <Link to="/" className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <Link
          to="/"
          className={`inline-flex items-center space-x-2 mb-4 transition-colors ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>

        {/* Live Event Header or Regular Event Header */}
        {event.status === 'live' ? (
          <>
             <LiveEventHeader 
               event={event}
               selectedCategory={null}
               onCategorySelect={() => {}}
             />
          </>
        
        ) : (
          <div className={`rounded-xl shadow-sm border p-8 transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {event.name}
                </h1>
                <div className={`flex items-center space-x-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDate(startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{formatTime(startDate)} - {formatTime(endDate)}</span>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className={`flex items-center space-x-2 mb-2`}>
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Categories
                  </span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {event.categories.length}
                </div>
              </div>
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Total Riders
                  </span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {event.categories.reduce((sum, cat) => sum + cat.riders.length, 0)}
                </div>
              </div>
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Status
                  </span>
                </div>
                <div className={`text-lg font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {event.status}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Selection for Non-Live Events */}
      {event.status !== 'live' && (
        <div className="mb-8">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.categories.map((category) => (
              <Link
                key={category.id}
                to={`/event/${event.id}/category/${category.id}`}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  isDarkMode
                    ? 'border-slate-600 bg-slate-800 hover:border-blue-400'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {category.name}
                </h3>
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  <Users className="h-4 w-4" />
                  <span>{category.riders.length} riders</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mb-20">
        {event.status === 'live' && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <p>Click on a category above to view live results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;