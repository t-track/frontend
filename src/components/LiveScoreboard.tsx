import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Heart, Activity, Flag, ChevronDown, ChevronUp, RefreshCw, CheckCircle, Loader, Circle } from 'lucide-react';
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
    gap: string;
    phaseKm: string;
    startPhase: string;
    arrival: string;
    loopSpeed: string;
    loopTime: string;
    inTime: string;
    recoveryTime: string;
    phaseSpeed: string;
    rideTime: string;
    rideSpeed: string;
    rank: string;
    ready4nextphase: Boolean;
    phaseInProgress: Boolean;
  }>;
  veterinary: Array<{
    phase: string;
    recoveryTimeVet: string;
    heartRate: string;
    recIndex: string;
    respiration: string;
    mucous: string;
    capRefill: string;
    skin: string;
    gutSound: string;
    girthBackWhiters: string;
    muscleTone: string;
    gait: string;
    veterinary: string;
    RI: string;
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
      
      const getValue = (label: string, occurrence = 0, offset: number = 1 ) => {
        const allIndices = data.List.Fields
          .map((field, index) => ({ label: field.Label, index }))
          .filter(field => field.label === label)
          .map(field => field.index);
        if (allIndices.length > occurrence) {
          return riderData[allIndices[occurrence] + offset] ?? '';
        }
        return '';
      };

      return {
        bib: getValue('Bib',0,-1),
        name: getValue('RIDER NAME', 0, 2).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        nationality: getValue('FLAG'),
        horse: getValue('HORSE NAME'),
        rank: getValue('Main rank'),
        totalTime: getValue('Ride Time'),
        phases: [
          {
            phase: '1',
            gap: getValue('Start',0),
            phaseKm: getValue('Phase Km',0 ), // ??
            arrival: getValue('Arrival',0),
            loopSpeed: getValue('Loop Speed',0),
            loopTime: getValue('Loop Time',0),
            inTime: getValue('In Time',0),
            recoveryTime: getValue('Recovery Time',0),
            phaseSpeed: getValue('Phase Speed',0),
            rideTime: getValue('Ride Time',0),
            rideSpeed: getValue('Ride Speed',0),
            rank: getValue('Rank',0),
            startPhase: getValue('Start phase',0),
            ready4nextphase: (getValue('Ready to next phase', 0) === 'yes'),
            phaseInProgress: (getValue('Ready to next phase', 0) === '' ),
            estimatedTimeArrival: (getValue('Extimated time arrival',0)),
            estimatedLoopTime: (getValue('Extimated loop time',0))
          },
          {
            phase: '2',
            gap: getValue('Start',1,0),
            phaseKm: getValue('Phase Km',1,0),
            startPhase: getValue('Start phase',1,0),
            arrival: getValue('Arrival',1,0),
            loopSpeed: getValue('Loop Speed',1,0),
            loopTime: getValue('Loop Time',1,0),
            inTime: getValue('In Time',1,0),
            recoveryTime: getValue('Recovery Time',1,0),
            phaseSpeed: getValue('Phase Speed',1,0),
            rideTime: getValue('Ride Time',1,0),
            rideSpeed: getValue('Ride Speed',1,0),
            rank: getValue('Rank',1,0),
            ready4nextphase: getValue('Ready to next phase', 1,0) === 'yes',
            phaseInProgress: (getValue('Ready to next phase', 1,0) === '' ),
            estimatedTimeArrival: (getValue('Extimated time arrival',1,0)),
            estimatedLoopTime: (getValue('Extimated loop time',1,0))
          },
          {
            phase: '3',
            gap: getValue('Start',2,-1),
            phaseKm: getValue('Phase Km',2,-1),
            startPhase: getValue('Start phase',2,-1),
            arrival: getValue('Arrival',2,-1),
            loopSpeed: getValue('Loop Speed',2,-1),
            loopTime: getValue('Loop Time',2,-1),
            inTime: getValue('In Time',2,-1),
            recoveryTime: getValue('Recovery Time',2,-1),
            phaseSpeed: getValue('Phase Speed',2,-1),
            rideTime: getValue('Ride Time',2,-1),
            rideSpeed: getValue('Ride Speed',2,-1),
            rank: getValue('Rank',2,-1),
            ready4nextphase: getValue('Ready to next phase', 2,-1) === 'yes',
            phaseInProgress: (getValue('Ready to next phase', 2,-1) === '' ),
            estimatedTimeArrival: (getValue('Extimated time arrival',2,-1)), // used for the loading bar
            estimatedLoopTime: (getValue('Extimated loop time',2,-1))
          }
        ],
        veterinary: [
          {
            phase: 'PRE',
            recoveryTimeVet: getValue( 'Recovery Time Vet' , 0 , -4 ) ,
            heartRate: getValue('Heart Rate',0, -4 ),
            recIndex: getValue('Rec. Index',0, -4 ),
            respiration: getValue('Resp.',0, -4 ),
            mucous: getValue('Mucous',0, -4 ),
            capRefill: getValue('Cap. Refill',0, -4 ),
            skin: getValue('Skin',0, -4 ),
            gutSound: getValue('Gut Sounds',0, -4 ),
            girthBackWhiters: getValue('Girth Back Whiters',0, -4 ),
            muscleTone: getValue('Muscle Tone',0, -4 ),
            gait: getValue('Gait',0, -4 ),
            veterinary: getValue('Veterinary',0, -4 ),
            RI: getValue('R.I.',0, -4 )
            
          },
          {
            phase: '1',
            recoveryTimeVet: getValue( 'Recovery Time Vet' , 1 , -7),
            heartRate: getValue('Heart Rate',1, -7 ),
            recIndex: getValue('Rec. Index',1, -7 ),
            respiration: getValue('Resp.',1, -7 ),
            mucous: getValue('Mucous',1, -7 ),
            capRefill: getValue('Cap. Refill',1, -7 ),
            skin: getValue('Skin',1, -7 ),
            gutSound: getValue('Gut Sounds',1, -7 ),
            girthBackWhiters: getValue('Girth Back Whiters',1, -7 ),
            muscleTone: getValue('Muscle Tone',1, -7 ),
            gait: getValue('Gait', 1, -7 ),
            veterinary: getValue('Veterinary',1 , -7 ),
            RI: getValue('R.I.', 1 , -7 )
          },
          {
            phase: '2',
            recoveryTimeVet: getValue( 'Recovery Time Vet' , 2 , 3),
            heartRate: getValue('Heart Rate', 2, 3 ),
            recIndex: getValue('Rec. Index', 2, 3 ),
            respiration: getValue('Resp.', 2, 3 ),
            mucous: getValue('Mucous', 2, 3 ),
            capRefill: getValue('Cap. Refill', 2, 3 ),
            skin: getValue('Skin', 2, 3 ),
            gutSound: getValue('Gut Sounds', 2, 3 ),
            girthBackWhiters: getValue('Girth Back Whiters', 2, 3 ),
            muscleTone: getValue('Muscle Tone', 2, 3 ),
            gait: getValue('Gait', 2, 3 ),
            veterinary: getValue('Veterinary', 2, 3 ),
            RI: getValue('R.I.', 2, 3 )
          },
          {
            phase: '3',
            heartRate: getValue('Heart Rate', 3, 13 ),
            recIndex: getValue('Rec. Index', 3, 13 ),
            respiration: getValue('Resp.', 3, 13 ),
            mucous: getValue('Mucous', 3, 13 ),
            capRefill: getValue('Cap. Refill', 3, 13 ),
            skin: getValue('Skin', 3, 13 ),
            gutSound: getValue('Gut Sounds', 3, 13 ),
            girthBackWhiters: getValue('Girth Back Whiters', 3, 13 ),
            muscleTone: getValue('Muscle Tone', 3, 13 ),
            gait: getValue('Gait', 3, 13 ),
            veterinary: getValue('Veterinary', 3, 13 ),
            RI: getValue('R.I.', 3, 13 ),
          }
        ]
      };
    });
    // console.log("riders", riders)
    setProcessedRiders(riders);
  };

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
            <div className="flex flex-col items-center justify-center space-x-2 text-emerald-100">
              {loading ? <>
                <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
                <p className="text-sm">Loading...</p>
              </>:<>
                <RefreshCw className="w-4 h-4" />
                <p className="text-sm">Next update:</p>
                <p className="text-sm">{countdown}s</p>
              </>}
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

const RiderRow = React.memo(({ rider }: { rider: ProcessedRider }) => {
// const RiderRow: React.FC<{ rider: ProcessedRider }> = ({ rider }) => {
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
    const key =  rider.bib +  'Position' + rider.name.replace(/[^a-zA-Z0-9]/g, '');
    if (position <= 3) {
      return (
        <div key={key} className={`flex items-center space-x-1 ${getPositionColor(position)}`}>
          {/* <Trophy className="w-5 h-5" /> */}
          <span className="font-bold text-lg">{position}</span>
        </div>
      );
    }
    return (
      <div key={key} className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
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
              {/* 
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">BIB</div>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">#{rider.bib}</span>
              </div>
               */}
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">POS</div>
                {getPositionBadge(position)}
              </div>
            </div>
            
            <div className="flex-1">

              <div className="flex items-center space-x-2 mb-1">
                <Flag className="w-4 h-4 text-gray-400" />
                <h4 className="font-bold text-gray-900 dark:text-white font-upper ">{rider.name}</h4>
              </div>
              
              <p id="horse name" className="text-sm text-gray-600 dark:text-gray-400 font-medium">{rider.horse}</p>
              
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">{rider.bib}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">({rider.nationality})</span>
              </div>
              
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* <div className="text-center min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">PHASE</div>
              <div key={rider.bib + 'phaseMap' + rider.name.replace(/[^a-zA-Z0-9]/g, '')} className="flex items-center space-x-1">
                  {
                    rider.phases.map((phase, idx) => {
                      const key = 'phase'+ idx
                      if (phase.ready4nextphase ) return <CheckCircle key={key} className="w-4 h-4"  color="green" />;
                      if (phase.phaseInProgress) return <Loader key={key} className="w-4 h-4" color="orange" />;
                      return <Circle key={key} className="w-4 h-4" color="gray" />;
                    })
                  }
                </div>
            </div> */}

             

            
            <div className="text-right min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">STARTED</div>
              <div className="flex items-center space-x-1">
                {/* <Clock className="w-4 h-4 text-gray-400" /> */}
                <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                  { rider.phases.map((phase, idx) => {
                    if (phase.phaseInProgress || rider.phases.length == idx + 1){
                      return phase.startPhase;
                    }
                  }) || rider.phases[2].startPhase }
                </span>
              </div>
            </div>
            
            {/* <div className="text-right min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">HR</div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold">
                  {rider.veterinary[0]?.heartRate || '--'}
                </span>
              </div>
            </div> */}
            
            <div className="text-gray-400">
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
        <PhaseProgressBar phases={rider.phases} />
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
                  <div key={'phase'+phaseIndex} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Phase {phase.phase}</span>
                      <span className="text-sm font-mono bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                        {phase.loopTime}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>Start: {phase.startPhase}</div>
                      <div>Arrival: {phase.arrival}</div>
                      <div>Speed: {phase.phaseSpeed} km/h</div>
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
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-600">
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Phase</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">HR</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">RI</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Resp</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Mucous</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Cap</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Skin</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Gut</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Girth</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Muscle</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Gait</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-900 dark:text-white">Vet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {rider.veterinary.map((vet, vetIndex) => (
                      <tr key={'vetindex'+vetIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
                        <td className="px-2 py-1 font-medium text-red-600 dark:text-red-400">{vet.phase}</td>
                        <td className="px-2 py-1 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Heart className="w-3 h-3 text-red-500" />
                            <span className="font-mono">{vet.heartRate}</span>
                          </div>
                        </td>
                        <td className="px-2 py-1 text-center font-medium">{vet.RI}</td>
                        <td className="px-2 py-1 text-center">{vet.respiration}</td>
                        <td className="px-2 py-1 text-center">{vet.mucous}</td>
                        <td className="px-2 py-1 text-center">{vet.capRefill}</td>
                        <td className={`px-2 py-1 text-center font-medium ${vet.skin === '1' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {vet.skin}
                        </td>
                        <td className={`px-2 py-1 text-center font-medium ${vet.gutSound === 'A' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {vet.gutSound}
                        </td>
                        <td className={`px-2 py-1 text-center font-medium ${vet.girthBackWhiters === 'A' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {vet.girthBackWhiters}
                        </td>
                        <td className={`px-2 py-1 text-center font-medium ${vet.muscleTone === 'A' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {vet.muscleTone}
                        </td>
                        <td className={`px-2 py-1 text-center font-medium ${vet.gait === 'A' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {vet.gait}
                        </td>
                        <td className="px-2 py-1 text-center">{vet.veterinary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const PhaseProgressBar: React.FC<{ phases: any[] }> = ({ phases }) => {
  const totalPhases = phases.length;
  
  return (
    <div className="w-full mt-2">
      <div className="flex w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
        {phases.map((phase, index) => {
          const segmentWidth = 100 / totalPhases;
          let segmentProgress = 0;
          
          if (phase.ready4nextphase) {
            segmentProgress = 100; // Phase completed
          } else if (phase.phaseInProgress && phase.estimatedTimeArrival) {
            // Calculate progress based on estimated time (mock calculation)
            segmentProgress = 60; // Placeholder for in-progress phase
          } else if (phase.phaseInProgress) {
            segmentProgress = 30; // Just started
          }
          
          return (
            <div
              key={`phase-${index}`}
              className="relative h-full border-r border-white dark:border-gray-600 last:border-r-0"
              style={{ width: `${segmentWidth}%` }}
            >
              <div
                className={`h-full transition-all duration-500 ${
                  phase.ready4nextphase 
                    ? 'bg-green-500' 
                    : phase.phaseInProgress 
                      ? 'bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{ width: `${segmentProgress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white drop-shadow-sm">
                  {index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
        {phases.map((_, index) => (
          <span key={`label-${index}`} className="text-center" style={{ width: `${100 / totalPhases}%` }}>
            Phase {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LiveScoreboard;