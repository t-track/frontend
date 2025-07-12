import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse';
      case 'upcoming': return 'bg-emerald-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'upcoming': return 'UPCOMING';
      case 'finished': return 'FINISHED';
      default: return 'UNKNOWN';
    }
  };

  return (
    <Link to={`/events/${event.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(event.status)}`}>
              {getStatusText(event.status)}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
            <div className="flex items-center text-white text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.startTime).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{event.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">{event.categories.length} categories</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{new Date(event.startTime).toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {event.categories.map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;