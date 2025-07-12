import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Zap, Trophy } from 'lucide-react';
import { Event } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface LiveEventHeaderProps {
  event: Event;
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const LiveEventHeader: React.FC<LiveEventHeaderProps> = ({ 
  event, 
  selectedCategory, 
  onCategorySelect 
}) => {
  const { isDarkMode } = useDarkMode();

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

  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);

  return (
    <div className={`rounded-xl shadow-sm border p-6 mb-6 ${
      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    }`}>
      {/* Event Title and Live Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {event.name}
          </h1>
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full animate-pulse">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">LIVE</span>
          </div>
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Event Details */}
      <div className={`flex flex-wrap items-center gap-6 mb-4 text-sm ${
        isDarkMode ? 'text-slate-300' : 'text-slate-600'
      }`}>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(startDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{formatTime(startDate)} - {formatTime(endDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>{event.categories.reduce((sum, cat) => sum + cat.riders.length, 0)} riders</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {event.categories.map((category) => (
          <Link
            key={category.id}
            to={`/event/${event.id}/category/${category.id}`}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : isDarkMode
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>{category.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-white/20 text-white'
                : isDarkMode
                  ? 'bg-slate-600 text-slate-300'
                  : 'bg-slate-200 text-slate-600'
            }`}>
              {category.riders.length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LiveEventHeader;