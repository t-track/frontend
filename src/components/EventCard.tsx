import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Event } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isDarkMode } = useDarkMode();
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const subscriptionDeadline = new Date(event.subscriptionDeadline);
  const now = new Date();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalRiders = event.categories.reduce((sum, category) => sum + category.riders.length, 0);

  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className={`rounded-xl shadow-sm border p-6 transition-all duration-200 hover:shadow-md group-hover:transform group-hover:scale-[1.02] ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700 hover:border-blue-500' 
          : 'bg-white border-slate-200 hover:border-blue-200'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className={`text-lg font-semibold transition-colors ${
              isDarkMode 
                ? 'text-white group-hover:text-blue-400' 
                : 'text-slate-900 group-hover:text-blue-600'
            }`}>
              {event.name}
            </h3>
            <div className={`flex items-center space-x-2 mt-1 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.status === 'upcoming' 
              ? 'bg-green-100 text-green-800' 
              : event.status === 'live'
              ? 'bg-red-100 text-red-800 animate-pulse'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {event.status === 'upcoming' ? 'Upcoming' : event.status === 'live' ? 'LIVE' : 'Completed'}
          </div>
        </div>

        <div className="space-y-3">
          <div className={`flex items-center space-x-4 text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(startDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(startDate)} - {formatTime(endDate)}</span>
            </div>
          </div>

          {event.status === 'upcoming' && (
            <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="font-medium">Registration deadline:</span>{' '}
              <span className={now > subscriptionDeadline ? 'text-red-600' : 'text-green-600'}>
                {formatDate(subscriptionDeadline)} at {formatTime(subscriptionDeadline)}
              </span>
            </div>
          )}

          <div className={`flex items-center justify-between pt-2 border-t ${
            isDarkMode ? 'border-slate-700' : 'border-slate-100'
          }`}>
            <div className={`flex items-center space-x-1 text-sm ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <Users className="h-4 w-4" />
              <span>{totalRiders} riders</span>
            </div>
            <div className="flex space-x-2">
              {event.categories.map((category) => (
                <span
                  key={category.id}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-slate-700 text-slate-300' 
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;