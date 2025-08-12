import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, Calendar } from 'lucide-react';
import { Horse } from '../types';
import { fetchHorses } from '../services/api';

const Horses: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [filteredHorses, setFilteredHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadHorses = async () => {
      try {
        const data = await fetchHorses();
        setHorses(data);
        setFilteredHorses(data);
      } catch (error) {
        console.error('Error loading horses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHorses();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = horses.filter(horse =>
        horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        horse.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        horse.owner?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHorses(filtered);
    } else {
      setFilteredHorses(horses);
    }
  }, [horses, searchTerm]);

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Horses</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse horse profiles and their racing achievements</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search horses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHorses.map((horse) => (
          <HorseCard key={horse.id} horse={horse} />
        ))}
      </div>

      {filteredHorses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No horses found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const HorseCard: React.FC<{ horse: Horse }> = ({ horse }) => {
  return (
    <Link to={`/horses/${horse.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1996327/pexels-photo-1996327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}
        >
          <div className="h-full bg-black bg-opacity-30 flex items-end">
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{horse.name}</h3>
              <p className="text-sm opacity-90">{horse.breed} • {horse.age} years</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>Owner: {horse.owner}</div>
              <div>FISE ID: {horse.fiseId}</div>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{horse.results.length} races</span>
            </div>
          </div>

          {horse.results.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last race: {horse.results[0].eventName}</span>
                </div>
                <div className="mt-1">
                  Position: {horse.results[0].position}° with {horse.results[0].riderName}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Horses;