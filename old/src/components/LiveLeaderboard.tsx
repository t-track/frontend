import React, { useState } from 'react';
import { Trophy, Clock, Activity, Flag, Zap, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Rider } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';
import RiderProfileModal from './RiderProfileModal';

interface LiveLeaderboardProps {
  riders: Rider[];
  categoryName: string;
}

const LiveLeaderboard: React.FC<LiveLeaderboardProps> = ({ riders, categoryName }) => {
  const { isDarkMode } = useDarkMode();
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [expandedRiders, setExpandedRiders] = useState<Set<string>>(new Set());

  const sortedRiders = [...riders].sort((a, b) => (a.currentPosition || 999) - (b.currentPosition || 999));

  const getFlagEmoji = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'ITA': '🇮🇹', 'UAE': '🇦🇪', 'FRA': '🇫🇷', 'GER': '🇩🇪',
      'USA': '🇺🇸', 'GBR': '🇬🇧', 'ESP': '🇪🇸', 'BRA': '🇧🇷'
    };
    return flags[nationality] || '🏁';
  };

  const getPositionBadge = (position: number) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold";
    switch (position) {
      case 1: return `${baseClasses} bg-yellow-500 text-white`;
      case 2: return `${baseClasses} bg-gray-400 text-white`;
      case 3: return `${baseClasses} bg-amber-600 text-white`;
      default: return `${baseClasses} ${isDarkMode ? 'bg-slate-600 text-white' : 'bg-slate-500 text-white'}`;
    }
  };

  const getStatusIndicator = (rider: Rider) => {
    if (rider.isActive) {
      return (
        <div className="flex items-center space-x-1 text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">Phase {rider.currentPhase}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1 text-orange-600">
          <Heart className="w-3 h-3" />
          <span className="text-xs font-medium">Vet Check</span>
        </div>
      );
    }
  };

  const toggleExpanded = (riderId: string) => {
    const newExpanded = new Set(expandedRiders);
    if (newExpanded.has(riderId)) {
      newExpanded.delete(riderId);
    } else {
      newExpanded.add(riderId);
    }
    setExpandedRiders(newExpanded);
  };

  return (
    <>
      <div className={`rounded-xl shadow-sm border ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {categoryName} - Live Standings
            </h2>
            <div className="flex items-center space-x-2 text-red-600">
              <Zap className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className={`px-6 py-3 border-b text-xs font-medium uppercase tracking-wider ${
          isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-slate-300' 
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-1">Pos</div>
            <div className="col-span-4">Rider / Horse</div>
            <div className="col-span-2">Time</div>
            <div className="col-span-2">Gap</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Details</div>
          </div>
        </div>

        {/* Riders List */}
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {sortedRiders.map((rider, index) => {
            const isExpanded = expandedRiders.has(rider.id);
            return (
              <div key={rider.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Position */}
                  <div className="col-span-1">
                    <div className={getPositionBadge(index + 1)}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Rider Info */}
                  <div className="col-span-4">
                    <div 
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedRider(rider)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getFlagEmoji(rider.nationality)}</span>
                        <div>
                          <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {rider.name}
                          </div>
                          <div className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {rider.horse.name}
                          </div>
                          <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {rider.nationality} • {rider.region}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Time */}
                  <div className="col-span-2">
                    <div className={`font-mono text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {rider.currentTime || rider.totalTime}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {rider.averageSpeed} km/h
                    </div>
                  </div>

                  {/* Gap to Leader */}
                  <div className="col-span-2">
                    <div className={`font-mono text-sm font-semibold ${
                      rider.gapToLeader === '00:00:00.000' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {rider.gapToLeader === '00:00:00.000' ? 'LEADER' : rider.gapToLeader}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    {getStatusIndicator(rider)}
                  </div>

                  {/* Expand Button */}
                  <div className="col-span-1">
                    <button
                      onClick={() => toggleExpanded(rider.id)}
                      className={`p-1 rounded transition-colors ${
                        isDarkMode 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Performance Stats */}
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Performance
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Current Phase:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.currentPhase}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Avg Speed:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.averageSpeed} km/h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Points:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.points || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Horse Details */}
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Horse Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Name:</span>
                            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.horse.name}</span>
                          </div>
                          {rider.horse.breed && (
                            <div className="flex justify-between">
                              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Breed:</span>
                              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.horse.breed}</span>
                            </div>
                          )}
                          {rider.horse.age && (
                            <div className="flex justify-between">
                              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Age:</span>
                              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{rider.horse.age} years</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          Quick Actions
                        </h4>
                        <div className="space-y-2">
                          <button
                            onClick={() => setSelectedRider(rider)}
                            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Profile
                          </button>
                          <a
                            href={`/horse/${rider.horse.id}`}
                            className={`block w-full px-3 py-2 text-sm text-center rounded-lg transition-colors ${
                              isDarkMode 
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Horse Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className={`px-6 py-4 border-t text-sm ${
          isDarkMode 
            ? 'border-slate-700 bg-slate-700/50 text-slate-300' 
            : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Racing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-3 h-3 text-orange-600" />
                <span>Vet Check</span>
              </div>
            </div>
            <div>
              Updates every 30 seconds • Click rider for details
            </div>
          </div>
        </div>
      </div>

      {/* Rider Profile Modal */}
      {selectedRider && (
        <RiderProfileModal 
          rider={selectedRider} 
          isOpen={!!selectedRider} 
          onClose={() => setSelectedRider(null)} 
        />
      )}
    </>
  );
};

export default LiveLeaderboard;