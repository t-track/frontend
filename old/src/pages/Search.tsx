import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Calendar, MapPin, Trophy } from 'lucide-react';
import { mockEvents, mockRiders } from '../data/mockData';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'events' | 'riders' | 'horses'>('events');
  const [dateFilter, setDateFilter] = useState('');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || event.startTime.includes(dateFilter);
    return matchesSearch && matchesDate;
  });

  const filteredRiders = mockRiders.filter(rider => 
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHorses = mockRiders.map(rider => rider.horse).filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.owner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <SearchIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Search Results</h1>
        </div>
        <p className="text-slate-600">
          Search through events, riders, and horses to find detailed information
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, riders, or horses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'events', label: 'Events', icon: Calendar },
              { key: 'riders', label: 'Riders', icon: Trophy },
              { key: 'horses', label: 'Horses', icon: Trophy }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSearchType(option.key as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  searchType === option.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <option.icon className="h-4 w-4" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {searchType === 'events' && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filter by year:</span>
            </div>
            <input
              type="text"
              placeholder="YYYY"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      <div className="mb-20">
        {searchType === 'events' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Events ({filteredEvents.length})
            </h2>
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to={`/event/${event.id}`}
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {event.name}
                    </Link>
                    <div className="flex items-center space-x-4 text-slate-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.startTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchType === 'riders' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Riders ({filteredRiders.length})
            </h2>
            {filteredRiders.map((rider) => (
              <div key={rider.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to={`/rider/${rider.id}`}
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {rider.name}
                    </Link>
                    <div className="flex items-center space-x-4 text-slate-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4" />
                        <Link 
                          to={`/horse/${rider.horse.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {rider.horse.name}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{rider.region}</span>
                      </div>
                    </div>
                  </div>
                  {rider.position && (
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Best Position</div>
                      <div className="text-2xl font-bold text-slate-900">#{rider.position}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {searchType === 'horses' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Horses ({filteredHorses.length})
            </h2>
            {filteredHorses.map((horse) => (
              <div key={horse.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to={`/horse/${horse.id}`}
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {horse.name}
                    </Link>
                    <div className="flex items-center space-x-4 text-slate-600 mt-2">
                      {horse.breed && (
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>{horse.breed}</span>
                        </div>
                      )}
                      {horse.owner && (
                        <div className="flex items-center space-x-1">
                          <span>Owner: {horse.owner}</span>
                        </div>
                      )}
                      {horse.age && (
                        <div className="flex items-center space-x-1">
                          <span>{horse.age} years</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {horse.pastResults && horse.pastResults.length > 0 && (
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Best Position</div>
                      <div className="text-2xl font-bold text-slate-900">
                        #{Math.min(...horse.pastResults.map(r => r.position))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;