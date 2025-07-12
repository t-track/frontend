import React, { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import { mockEvents } from '../data/mockData';
import { useDarkMode } from '../hooks/useDarkMode';

const EventsList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'live'>('all');
  const { isDarkMode } = useDarkMode();

  const filteredEvents = mockEvents.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'live') return event.status === 'live';
    return event.status === filter;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-8 w-8 text-blue-600" />
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Racing Events
          </h1>
        </div>
        <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
          Discover upcoming races and explore detailed results from past events
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-slate-600" />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Filter:
          </span>
        </div>
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Events' },
            { key: 'live', label: 'Live', isLive: true },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'past', label: 'Past Events' }
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                filter === option.key
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-blue-400 hover:text-blue-400'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                {option.isLive && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsList;