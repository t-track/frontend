import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Heart, Activity, Flag, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { LiveData } from '../types';
import { fetchLiveData } from '../services/api';

interface LiveScoreboardProps {
  apiUrl: string;
}

interface ProcessedRider {
  bib: string;
  name: string;
  nationality: string;
  horse: string;
  rank: string;
  totalTime: string;
  phases: Array<{
    phase: string;
    startTime: string;
    arrival: string;
    loopTime: string;
    speed: string;
    rank: string;
    gap: string;
  }>;
  veterinary: Array<{
    phase: string;
    heartRate: string;
    recovery: string;
    status: string;
  }>;
}

const LiveScoreboard: React.FC<LiveScoreboardProps> = ({ apiUrl }) => {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [processedRiders, setProcessedRiders] = useState<ProcessedRider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'position' | 'time' | 'name'>('position');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiUrl) {
        // Use mock data when no API URL is provided
        try {
          setLoading(true);
          setError(null);
          const mockData = await fetchLiveData('mock');
          if (mockData) {
            setLiveData(mockData);
            processLiveData(mockData);
          }
        } catch (err) {
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLiveData(apiUrl);
        
        if (data) {
          setLiveData(data);
          processLiveData(data);
        }
      } catch (err) {
        setError('Failed to fetch live data');
        console.error('Error fetching live data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up refresh interval and countdown
    const refreshInterval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 30; // Reset countdown
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, [apiUrl]);

  useEffect(() => {
    if (processedRiders.length > 0) {
      const sorted = [...processedRiders].sort((a, b) => {
        switch (sortBy) {
          case 'position':
            return parseInt(a.rank) - parseInt(b.rank);
          case 'time':
            return a.totalTime.localeCompare(b.totalTime);
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
      setProcessedRiders(sorted);
    }
  }, [sortBy]);

  const processLiveData = (data: LiveData) => {
    const riders: ProcessedRider[] = data.Data.map((riderData) => {
      const getValue = (label: string) => {
        const index = data.List.Fields.findIndex(field => field.Label === label);
        return index !== -1 ? riderData[index] : '';
      };

      return {
        bib: getValue('Bib'),
        name: getValue('RIDERNAME'),
        nationality: getValue('FLAG'),
        horse: getValue('HORSENAME'),
        rank: getValue('Mainrank'),
        totalTime: getValue('RideTime'),
        phases: [
          {
            phase: '1',
            startTime: getValue('Startphase'),
            arrival: getValue('Arrival'),
            loopTime: getValue('LoopTime'),
            speed: getValue('LoopSpeed'),
            rank: getValue('Rank'),
            gap: getValue('Start')
          },
          {
            phase: '2',
            startTime: getValue('Startphase'),
            arrival: getValue('Arrival'),
            loopTime: getValue('LoopTime'),
            speed: getValue('LoopSpeed'),
            rank: getValue('Rank'),
            gap: getValue('Start')
          },
          {
            phase: '3',
            startTime: getValue('Startphase'),
            arrival: getValue('Arrival'),
            loopTime: getValue('LoopTime'),
            speed: getValue('LoopSpeed'),
            rank: getValue('Rank'),
            gap: getValue('Start')
          }
        ],
        veterinary: [
          {
            phase: 'PRE',
            heartRate: getValue('HeartRate'),
            recovery: getValue('RecoveryTimeVet'),
            status: getValue('Veterinary')
          },
          {
            phase: '1',
            heartRate: getValue('HeartRate'),
            recovery: getValue('RecoveryTimeVet'),
            status: getValue('Veterinary')
          },
          {
            phase: '2',
            heartRate: getValue('HeartRate'),
            recovery: getValue('RecoveryTimeVet'),
            status: getValue('Veterinary')
          },
          {
            phase: '3',
            heartRate: getValue('HeartRate'),
            recovery: getValue('RecoveryTimeVet'),
            status: getValue('Veterinary')
          }
        ]
      };
    });
    setProcessedRiders(riders);
  };

  

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Error loading live data: {error}</p>
        </div>
      </div>
    );
  }

  if (!liveData || processedRiders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No live race data available</p>
          <p className="text-sm mt-2">Configure the live API URL in settings to see real-time results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{liveData.List.HeadLine1}</h3>
            <p className="text-emerald-100 text-sm">{processedRiders.length} riders competing</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-emerald-100">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Next update: {countdown}s</span>
            </div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm">LIVE</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sort by:
          </div>
          <div className="flex space-x-2">
            {[
              { key: 'position', label: 'Position' },
              { key: 'time', label: 'Time' },
              { key: 'name', label: 'Name' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key as any)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  sortBy === key 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {processedRiders.map((rider) => (
          <RiderRow key={rider.bib} rider={rider} />
        ))}
      </div>
    </div>
  );
};

const RiderRow: React.FC<{ rider: ProcessedRider }> = ({ rider }) => {
  const [expanded, setExpanded] = useState(false);
  
  const position = parseInt(rider.rank) || 0;
  const gap = rider.phases[0]?.gap || '';
  
  const getGapDisplay = (gap: string) => {
    if (!gap || gap === '[-]') return 'Leader';
    return gap.replace(/[\[\]]/g, '');
  };

  const getGapColor = (gap: string) => {
    if (!gap || gap === '[-]') return 'text-emerald-600 dark:text-emerald-400 font-semibold';
    return 'text-red-600 dark:text-red-400';
  };

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-500';
    if (position === 2) return 'text-gray-400';
    if (position === 3) return 'text-amber-600';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getPositionBadge = (position: number) => {
    if (position <= 3) {
      return (
        <div className={`flex items-center space-x-1 ${getPositionColor(position)}`}>
          <Trophy className="w-5 h-5" />
          <span className="font-bold text-lg">{position}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
        <span className="font-bold text-lg">{position}</span>
      </div>
    );
  };

  return (
    <div className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
      position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/20' : ''
    }`}>
      <div
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">BIB</div>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">#{rider.bib}</span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">POS</div>
                {getPositionBadge(position)}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Flag className="w-4 h-4 text-gray-400" />
                <h4 className="font-bold text-gray-900 dark:text-white">{rider.name}</h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">({rider.nationality})</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{rider.horse}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">GAP</div>
              <div className={`text-sm font-semibold ${getGapColor(gap)}`}>
                {getGapDisplay(gap)}
              </div>
            </div>
            
            <div className="text-right min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">TIME</div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                  {rider.totalTime || '--:--:--'}
                </span>
              </div>
            </div>
            
            <div className="text-right min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">HR</div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold">
                  {rider.veterinary[0]?.heartRate || '--'}
                </span>
              </div>
            </div>
            
            <div className="text-gray-400">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Phase Results
              </h5>
              <div className="space-y-3">
                {rider.phases.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Phase {phase.phase}</span>
                      <span className="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                        {phase.loopTime}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Start: {phase.startTime}</div>
                      <div>Arrival: {phase.arrival}</div>
                      <div>Speed: {phase.speed} km/h</div>
                      <div>Rank: {phase.rank}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Veterinary Checks
              </h5>
              <div className="space-y-3">
                {rider.veterinary.map((vet, vetIndex) => (
                  <div key={vetIndex} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-red-600 dark:text-red-400">Check {vet.phase}</span>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-mono font-semibold">{vet.heartRate} bpm</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Recovery: {vet.recovery}</div>
                      <div className={`font-semibold ${vet.status === 'Ok' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        Status: {vet.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveScoreboard;