import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Trophy, Clock, Activity, Flag, Zap } from 'lucide-react';
import { Rider } from '../types';
import { useDarkMode } from '../hooks/useDarkMode';
import RiderProfileModal from './RiderProfileModal';

interface LiveRiderCardProps {
  rider: Rider;
  rank: number;
}

const LiveRiderCard: React.FC<LiveRiderCardProps> = ({ rider, rank }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isDarkMode } = useDarkMode();

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-yellow-500 text-white';
      case 2: return 'bg-gray-400 text-white';
      case 3: return 'bg-amber-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600' : 'text-orange-600';
  };

  const getStatusText = (isActive: boolean, phase: number) => {
    return isActive ? `Phase ${phase}` : 'Vet Check';
  };

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

  return (
    <>
      <div 
        className={`rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
          isDarkMode 
            ? rider.isActive 
              ? 'bg-slate-800 border-green-600/50 hover:border-green-500' 
              : 'bg-slate-800 border-orange-600/50 hover:border-orange-500'
            : rider.isActive 
              ? 'bg-white border-green-200 bg-green-50/30 hover:border-green-300' 
              : 'bg-white border-orange-200 bg-orange-50/30 hover:border-orange-300'
        }`}
        onClick={() => setShowModal(true)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(rank)}`}>
                {rank}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getFlagEmoji(rider.nationality)}</span>
                <div>
                  <Link 
                    to={`/rider/${rider.id}`}
                    className={`font-semibold transition-colors ${
                      isDarkMode 
                        ? 'text-white hover:text-blue-400' 
                        : 'text-slate-900 hover:text-blue-600'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {rider.name}
                  </Link>
                  <Link 
                    to={`/horse/${rider.horse.id}`}
                    className={`block text-sm transition-colors ${
                      isDarkMode 
                        ? 'text-slate-300 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {rider.horse.name}
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-medium ${getStatusColor(rider.isActive || false)}`}>
                {getStatusText(rider.isActive || false, rider.currentPhase || 1)}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {rider.nationality}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Time
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {rider.currentTime || rider.totalTime}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gap
              </div>
              <div className={`text-sm font-semibold ${
                rider.gapToLeader === '00:00:00.000' ? 'text-green-600' : 'text-red-600'
              }`}>
                {rider.gapToLeader === '00:00:00.000' ? 'LEADER' : rider.gapToLeader}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Speed
              </div>
              <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {rider.averageSpeed} km/h
              </div>
            </div>
          </div>

          <div className={`text-xs text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {rider.region}
          </div>

          {expanded && (
            <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-slate-600' : 'border-slate-200'}`}>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Current Position:</span>
                  <span className={`ml-2 font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    #{rider.currentPosition}
                  </span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Current Phase:</span>
                  <span className={`ml-2 font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.currentPhase}
                  </span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Status:</span>
                  <span className={`ml-2 font-semibold ${getStatusColor(rider.isActive || false)}`}>
                    {rider.isActive ? 'Racing' : 'Vet Check'}
                  </span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Points:</span>
                  <span className={`ml-2 font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {rider.points || 'N/A'}
                  </span>
                </div>
              </div>
              
              <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
                <Link
                  to={`/rider/${rider.id}`}
                  className={`inline-flex items-center space-x-2 transition-colors ${
                    isDarkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">View Full Profile</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <RiderProfileModal 
        rider={rider} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default LiveRiderCard;