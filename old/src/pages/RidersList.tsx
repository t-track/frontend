import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trophy, MapPin } from 'lucide-react';
import { mockRiders } from '../data/mockData';

const RidersList: React.FC = () => {
  return (
    <div className="md:ml-64">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Riders</h1>
        </div>
        <p className="text-slate-600">
          Browse all riders and their achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {mockRiders.map((rider) => (
          <div key={rider.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="mb-4">
              <Link
                to={`/rider/${rider.id}`}
                className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                {rider.name}
              </Link>
              <div className="flex items-center space-x-2 text-slate-600 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{rider.region}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Current Horse:</span>
                <Link
                  to={`/horse/${rider.horse.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {rider.horse.name}
                </Link>
              </div>

              {rider.position && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Best Position:</span>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-slate-900">#{rider.position}</span>
                  </div>
                </div>
              )}

              {rider.averageSpeed && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average Speed:</span>
                  <span className="text-sm font-medium text-slate-900">{rider.averageSpeed} km/h</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RidersList;