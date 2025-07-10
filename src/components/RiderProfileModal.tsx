import React from 'react';
import { X, Trophy, MapPin, Activity, Heart, Clock, Flag } from 'lucide-react';
import { Rider } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';

interface RiderProfileModalProps {
  rider: Rider;
  isOpen: boolean;
  onClose: () => void;
}

const RiderProfileModal: React.FC<RiderProfileModalProps> = ({ rider, isOpen, onClose }) => {
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  const getFlagEmoji = (nationality: string) => {
    const flags: { [key: string]: string } = {
      'ITA': '🇮🇹',
      'UAE': '🇦🇪',
      'FRA': '🇫🇷',
      'GER': '🇩🇪',
      'USA': '🇺🇸',
      'GBR': '🇬🇧',
      'ESP': '🇪🇸',
      'BRA': '🇧🇷'
    };
    return flags[nationality] || '🏁';
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return isDarkMode ? 'text-slate-300' : 'text-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className={`inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-2xl shadow-xl ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getFlagEmoji(rider.nationality)}</span>
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.name}
                  </h3>
                  <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {rider.nationality} • {rider.region}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Current Race Stats */}
          <div className={`rounded-xl p-4 mb-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Current Race Performance
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Position</span>
                </div>
                <div className={`text-xl font-bold ${getPositionColor(rider.currentPosition || 0)}`}>
                  #{rider.currentPosition}
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Gap</span>
                </div>
                <div className={`text-lg font-semibold ${
                  rider.gapToLeader === '00:00:00.000' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {rider.gapToLeader === '00:00:00.000' ? 'LEADER' : rider.gapToLeader}
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Phase</span>
                </div>
                <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rider.currentPhase}
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Flag className="h-4 w-4" />
                  <span className="text-sm">Status</span>
                </div>
                <div className={`text-lg font-semibold ${
                  rider.isActive ? 'text-green-500' : 'text-orange-500'
                }`}>
                  {rider.isActive ? 'Racing' : 'Vet Check'}
                </div>
              </div>
            </div>
          </div>

          {/* Horse Information */}
          <div className={`rounded-xl p-4 mb-6 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Horse Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Name:</span>
                <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rider.horse.name}
                </div>
              </div>
              {rider.horse.breed && (
                <div>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Breed:</span>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.horse.breed}
                  </div>
                </div>
              )}
              {rider.horse.age && (
                <div>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Age:</span>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.horse.age} years
                  </div>
                </div>
              )}
              {rider.horse.owner && (
                <div>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Owner:</span>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.horse.owner}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
            <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Performance Metrics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Current Time</span>
                </div>
                <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rider.currentTime || rider.totalTime}
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Avg Speed</span>
                </div>
                <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rider.averageSpeed} km/h
                </div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center space-x-1 mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">Points</span>
                </div>
                <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {rider.points || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Close
            </button>
            <a
              href={`/rider/${rider.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfileModal;