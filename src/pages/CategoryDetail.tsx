import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Heart, User } from 'lucide-react';
import { Rider } from '../types';
import { fetchRidersByCategory } from '../services/api';

const CategoryDetail: React.FC = () => {
  const { eventId, categoryName } = useParams<{ eventId: string; categoryName: string }>();
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRiders = async () => {
      if (!eventId || !categoryName) return;

      try {
        const data = await fetchRidersByCategory(eventId, categoryName);
        setRiders(data);
      } catch (error) {
        console.error('Error loading riders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRiders();
  }, [eventId, categoryName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to={`/events/${eventId}`} className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{categoryName} Results</h1>
      </div>

      <div className="space-y-6">
        {riders.map((rider) => (
          <RiderCard key={rider.id} rider={rider} />
        ))}
      </div>

      {riders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No riders found for this category.</p>
        </div>
      )}
    </div>
  );
};

const RiderCard: React.FC<{ rider: Rider }> = ({ rider }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {rider.position && (
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{rider.position}°</span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{rider.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{rider.club} - {rider.region}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">Horse: {rider.horseName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Nationality: {rider.nationality}</p>
            {rider.totalTime && (
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-mono text-sm">{rider.totalTime}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={`/riders/${rider.id}`}
              className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </Link>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {expanded ? 'Show Less' : 'Show Details'}
          </button>
        </div>

        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Phase Results</h4>
                <div className="space-y-3">
                  {rider.phases.map((phase, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Phase {phase.phase} ({phase.km}km)</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{phase.speed} km/h</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>Start: {phase.startTime}</div>
                        <div>Arrival: {phase.arrivalTime}</div>
                        <div>Loop Time: {phase.loopTime}</div>
                        <div>Recovery: {phase.recoveryTime}</div>
                        {phase.rank && <div>Rank: {phase.rank}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Veterinary Checks</h4>
                <div className="space-y-3">
                  {rider.veterinaryChecks.map((check, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{check.phase}</span>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{check.heartRate} bpm</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>Status: {check.veterinary}</div>
                        <div>Respiration: {check.respiration}</div>
                        <div>Mucous: {check.mucous}</div>
                        <div>Gait: {check.gait}</div>
                        {check.recoveryTime && <div>Recovery: {check.recoveryTime}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;