import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, User } from 'lucide-react';
import { mockHorses, mockEvents } from '../data/mockData';

const HorseProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const horse = mockHorses.find(h => h.id === id);

  if (!horse) {
    return (
      <div className="md:ml-64">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Horse Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Events</span>
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{horse.name}</h1>
              <div className="space-y-2">
                {horse.breed && (
                  <div className="flex items-center space-x-2 text-slate-600">
                    <span className="font-medium">Breed:</span>
                    <span>{horse.breed}</span>
                  </div>
                )}
                {horse.age && (
                  <div className="flex items-center space-x-2 text-slate-600">
                    <span className="font-medium">Age:</span>
                    <span>{horse.age} years</span>
                  </div>
                )}
                {horse.owner && (
                  <div className="flex items-center space-x-2 text-slate-600">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Owner:</span>
                    <span>{horse.owner}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Events Participated</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {horse.pastResults?.length || 0}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Best Position</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {horse.pastResults && horse.pastResults.length > 0 
                  ? `#${Math.min(...horse.pastResults.map(r => r.position))}`
                  : 'N/A'
                }
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Last Race</span>
              </div>
              <div className="text-lg font-semibold text-slate-900">
                {horse.pastResults && horse.pastResults.length > 0 
                  ? new Date(horse.pastResults[0].date).toLocaleDateString()
                  : 'N/A'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {horse.pastResults && horse.pastResults.length > 0 && (
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Race History</h2>
          <div className="space-y-4">
            {horse.pastResults.map((result, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      to={`/event/${result.eventId}`}
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {result.eventName}
                    </Link>
                    <div className="flex items-center space-x-4 text-slate-600 mt-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4" />
                        <span>{result.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Position</div>
                    <div className={`text-2xl font-bold ${
                      result.position === 1 ? 'text-yellow-600' :
                      result.position === 2 ? 'text-gray-600' :
                      result.position === 3 ? 'text-amber-600' :
                      'text-slate-900'
                    }`}>
                      #{result.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorseProfile;