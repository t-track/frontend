import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Trophy, Flag } from 'lucide-react';
import { Rider } from '../types';
import { fetchRiders } from '../services/api';

const Riders: React.FC = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [filteredRiders, setFilteredRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadRiders = async () => {
      try {
        const data = await fetchRiders();
        setRiders(data);
        setFilteredRiders(data);
      } catch (error) {
        console.error('Error loading riders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRiders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = riders.filter(rider =>
        rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRiders(filtered);
    } else {
      setFilteredRiders(riders);
    }
  }, [riders, searchTerm]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Riders</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse rider profiles and their racing history</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search riders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRiders.map((rider) => (
          <RiderCard key={rider.id} rider={rider} />
        ))}
      </div>

      {filteredRiders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No riders found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const RiderCard: React.FC<{ rider: Rider }> = ({ rider }) => {
  return (
    <Link to={`/riders/${rider.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{rider.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{rider.fiseId}</p>
            </div>
          </div>
          {rider.position && (
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{rider.position}°</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{rider.nationality}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div>Club: {rider.club}</div>
            <div>Region: {rider.region}</div>
            <div>Horse: {rider.horseName}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Riders;