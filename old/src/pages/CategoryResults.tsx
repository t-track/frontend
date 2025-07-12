import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Clock, Activity } from 'lucide-react';
import LiveLeaderboard from '../components/LiveLeaderboard';
import RiderCard from '../components/RiderCard';
import LiveConnectionStatus from '../components/LiveConnectionStatus';
import { useLiveData } from '../hooks/useLiveData';
import { mockEvents } from '../data/mockData';
import { useDarkMode } from '../hooks/useDarkMode';
import { Rider } from '../types';

const CategoryResults: React.FC = () => {
  const { eventId, categoryId } = useParams<{ eventId: string; categoryId: string }>();
  const { isDarkMode } = useDarkMode();
  const [displayRiders, setDisplayRiders] = useState<Rider[]>([]);

  const event = mockEvents.find(e => e.id === eventId);
  const category = event?.categories.find(c => c.id === categoryId);
  
  // Use live data for live events, mock data for others
  const isLiveEvent = event?.status === 'live';
  const { 
    riders: liveRiders, 
    loading: liveLoading, 
    error: liveError,
    lastUpdated 
  } = useLiveData({
    eventId: isLiveEvent ? eventId : undefined,
    categoryId: isLiveEvent ? categoryId : undefined,
    enabled: isLiveEvent
  });

  // Update display riders based on data source
  useEffect(() => {
    if (isLiveEvent && liveRiders.length > 0) {
      setDisplayRiders(liveRiders);
    } else if (category) {
      setDisplayRiders(category.riders);
    }
  }, [isLiveEvent, liveRiders, category]);

  if (!event || !category) {
    return (
      <div className="md:ml-64">
        <div className="text-center py-12">
          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Category Not Found
          </h1>
          <Link to="/" className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="md:ml-64">
      <div className="mb-8">
        <Link
          to={`/event/${eventId}`}
          className={`inline-flex items-center space-x-2 mb-4 transition-colors ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Event</span>
        </Link>

        {/* Category Header */}
        <div className={`rounded-xl shadow-sm border p-6 mb-6 ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {category.name}
              </h1>
              <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {event.name} • {event.location}
              </p>
            </div>
            {event.status === 'live' && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>
            )}
            {event.status === 'live' && (
              <LiveConnectionStatus />
            )}
          </div>

          <div className={`flex flex-wrap items-center gap-6 text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{formatDate(startDate)} • {formatTime(startDate)} - {formatTime(endDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{displayRiders.length} riders</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>{category.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-20">
        {event.status === 'live' ? (
          <LiveLeaderboard 
            riders={displayRiders}
            categoryName={category.name}
          />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Final Results
              </h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </div>
            </div>
            <div className="space-y-4">
              {displayRiders
                .sort((a, b) => (a.position || 999) - (b.position || 999))
                .map((rider) => (
                  <RiderCard key={rider.id} rider={rider} showPosition={event.status === 'past'} />
                ))}
            </div>
          </div>
        )}
        
        {/* Loading and Error States for Live Data */}
        {isLiveEvent && liveLoading && displayRiders.length === 0 && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading live results...</p>
          </div>
        )}
        
        {isLiveEvent && liveError && displayRiders.length === 0 && (
          <div className={`text-center py-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            <p>Failed to load live results: {liveError}</p>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Please check your connection and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryResults;