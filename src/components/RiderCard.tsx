import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Trophy, Clock, Heart, Activity } from 'lucide-react';
import { Rider } from '../types';

interface RiderCardProps {
  rider: Rider;
  showPosition?: boolean;
}

const RiderCard: React.FC<RiderCardProps> = ({ rider, showPosition = false }) => {
  const [expanded, setExpanded] = useState(false);

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-yellow-500 text-white';
      case 2: return 'bg-gray-400 text-white';
      case 3: return 'bg-amber-600 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {showPosition && rider.position && (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${getPositionColor(rider.position)}`}>
                {rider.position}
              </div>
            )}
            <div>
              <Link 
                to={`/rider/${rider.id}`}
                className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                {rider.name}
              </Link>
              {rider.nationality && (
                <span className="ml-2 text-sm text-slate-500">({rider.nationality})</span>
              )}
              <Link 
                to={`/horse/${rider.horse.id}`}
                className="block text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                {rider.horse.name}
              </Link>
              <span className="text-xs text-slate-500">{rider.region}</span>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm">Details</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {showPosition && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Total Time</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">{rider.totalTime}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                <Activity className="h-4 w-4" />
                <span className="text-xs">Avg Speed</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">{rider.averageSpeed} km/h</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-slate-600 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-xs">Points</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">{rider.points}</div>
            </div>
          </div>
        )}

        {expanded && (
          <div className="mt-6 space-y-6 border-t border-slate-200 pt-6">
            {/* Phases */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Phase Results</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-2 py-2 text-left">Phase</th>
                      <th className="px-2 py-2 text-left">Start</th>
                      <th className="px-2 py-2 text-left">Arrival</th>
                      <th className="px-2 py-2 text-left">Time</th>
                      <th className="px-2 py-2 text-left">Avg Speed</th>
                      <th className="px-2 py-2 text-left">Recovery</th>
                      <th className="px-2 py-2 text-left">HR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rider.phases.map((phase, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="px-2 py-2 font-medium">{phase.phaseNumber}</td>
                        <td className="px-2 py-2">{phase.startTime}</td>
                        <td className="px-2 py-2">{phase.arrival}</td>
                        <td className="px-2 py-2">{phase.time}</td>
                        <td className="px-2 py-2">{phase.arrivalAverage}</td>
                        <td className="px-2 py-2">{phase.recoveryTime}</td>
                        <td className="px-2 py-2">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span>{phase.heartRate}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vet Checks */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Veterinary Checks</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-2 py-2 text-left">Phase</th>
                      <th className="px-2 py-2 text-left">Recovery</th>
                      <th className="px-2 py-2 text-left">HR</th>
                      <th className="px-2 py-2 text-left">Rec Index</th>
                      <th className="px-2 py-2 text-left">Resp</th>
                      <th className="px-2 py-2 text-left">Mucous</th>
                      <th className="px-2 py-2 text-left">Gait</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rider.vetChecks.map((check, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        <td className="px-2 py-2 font-medium">{check.phase}</td>
                        <td className="px-2 py-2">{check.recoveryTime}</td>
                        <td className="px-2 py-2">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span>{check.heartRate}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2">{check.recIndex}</td>
                        <td className="px-2 py-2">{check.respiratory}</td>
                        <td className="px-2 py-2">{check.mucous}</td>
                        <td className="px-2 py-2">{check.gait}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderCard;