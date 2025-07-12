import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Activity } from 'lucide-react';
import { mockRiders, mockEvents } from '../data/mockData';

const RiderProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rider = mockRiders.find(r => r.id === id);

  if (!rider) {
    return (
      <div className="md:ml-64">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Rider Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const riderResults = mockEvents.filter(event => 
    event.categories.some(category => 
      category.riders.some(r => r.id === rider.id)
    )
  );

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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{rider.name}</h1>
              <p className="text-slate-600 mb-4">{rider.region}</p>
              <div className="flex items-center space-x-4">
                <Link 
                  to={`/horse/${rider.horse.id}`}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                >
                  <Trophy className="h-4 w-4" />
                  <span>Current Horse: {rider.horse.name}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Events Participated</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{riderResults.length}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Best Position</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {rider.position ? `#${rider.position}` : 'N/A'}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Average Speed</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {rider.averageSpeed} km/h
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Event History</h2>
        <div className="space-y-4">
          {riderResults.map((event) => (
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
                <div className="text-right">
                  <div className="text-sm text-slate-600">Position</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {rider.position ? `#${rider.position}` : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;