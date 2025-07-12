import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, User, Calendar } from 'lucide-react';
import { mockHorses } from '../data/mockData';

const HorsesList: React.FC = () => {
  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Horses</h1>
        </div>
        <p className="text-slate-600">
          Browse all horses and their racing history
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {mockHorses.map((horse) => (
          <div key={horse.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <Link
                to={`/horse/${horse.id}`}
                className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                {horse.name}
              </Link>
              {horse.breed && (
                <div className="text-slate-600 mt-1">
                  <span className="text-sm">{horse.breed}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {horse.owner && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Owner:</span>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">{horse.owner}</span>
                  </div>
                </div>
              )}

              {horse.age && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Age:</span>
                  <span className="text-sm font-medium text-slate-900">{horse.age} years</span>
                </div>
              )}

              {horse.pastResults && horse.pastResults.length > 0 && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Best Position:</span>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-slate-900">
                        #{Math.min(...horse.pastResults.map(r => r.position))}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Last Race:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-900">
                        {new Date(horse.pastResults[0].date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorsesList;