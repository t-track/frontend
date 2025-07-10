import { Event, Rider, Horse, Phase, VetCheck } from '../types';

export const mockHorses: Horse[] = [
  {
    id: '1',
    name: 'OFENA BOSANA',
    age: 8,
    breed: 'Arabian',
    owner: 'Claudio Bellagente',
    pastResults: [
      { eventId: '1', eventName: 'Summer Sprint Race', date: '2024-07-15', position: 3, category: 'CEI3* 160' },
      { eventId: '2', eventName: 'Mountain Challenge', date: '2024-08-20', position: 1, category: 'CEI2* 120' }
    ]
  },
  {
    id: '2',
    name: 'THUNDER BOLT',
    age: 6,
    breed: 'Anglo-Arabian',
    owner: 'Maria Rossi',
    pastResults: [
      { eventId: '1', eventName: 'Summer Sprint Race', date: '2024-07-15', position: 1, category: 'CEI3* 160' }
    ]
  },
  {
    id: '3',
    name: 'DESERT WIND',
    age: 7,
    breed: 'Arabian',
    owner: 'Ahmed Al-Rashid',
    pastResults: [
      { eventId: '1', eventName: 'Summer Sprint Race', date: '2024-07-15', position: 2, category: 'CEI3* 160' }
    ]
  }
];

export const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'BELLAGENTE CLAUDIO',
    nationality: 'ITA',
    horse: mockHorses[0],
    position: 3,
    currentPosition: 2,
    gapToLeader: '+00:02:15.450',
    currentPhase: 2,
    isActive: true,
    totalTime: '6:13:18',
    currentTime: '4:10:32',
    averageSpeed: 13.2073,
    points: 62,
    region: 'Emilia Romagna 424',
    phases: [
      {
        phaseNumber: 1,
        startTime: '07:54:00',
        intermediateControl: '15:15:09',
        controlAverage: 13.89,
        arrival: '9:55:08',
        time: '2:01:07',
        arrivalAverage: 13.870,
        recoveryTime: '1:52',
        heartRate: 58
      },
      {
        phaseNumber: 2,
        startTime: '10:36:59',
        intermediateControl: '12:30:06',
        controlAverage: 13.52,
        arrival: '12:39:24',
        time: '2:02:23',
        arrivalAverage: 13.726,
        recoveryTime: '2:03',
        heartRate: 63
      },
      {
        phaseNumber: 3,
        startTime: '13:21:26',
        intermediateControl: '15:15:09',
        controlAverage: 13.45,
        arrival: '15:27:19',
        time: '2:05:52',
        arrivalAverage: 13.346,
        recoveryTime: '2:10',
        heartRate: 62,
        scoringTime: '6:13:18',
        scoringAverage: 13.500,
        score: 13.2073
      }
    ],
    vetChecks: [
      {
        phase: 'PRE',
        recoveryTime: '',
        heartRate: 30,
        recIndex: 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      },
      {
        phase: '1',
        recoveryTime: '1:52',
        heartRate: 58,
        recIndex: -2,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'B',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      },
      {
        phase: '2',
        recoveryTime: '2:03',
        heartRate: 63,
        recIndex: -3,
        respiratory: 'Ok',
        mucous: 'B',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      },
      {
        phase: '3',
        recoveryTime: '2:10',
        heartRate: 62,
        recIndex: 0,
        respiratory: 'Ok',
        mucous: 'B',
        capRefill: 1,
        skin: 1,
        gutSounds: 'B',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      }
    ]
  },
  {
    id: '2',
    name: 'MARIA ROSSI',
    nationality: 'ITA',
    horse: mockHorses[1],
    position: 1,
    currentPosition: 1,
    gapToLeader: '00:00:00.000',
    currentPhase: 2,
    isActive: true,
    totalTime: '5:58:45',
    currentTime: '4:08:17',
    averageSpeed: 13.8,
    points: 68,
    region: 'Tuscany 301',
    phases: [
      {
        phaseNumber: 1,
        startTime: '07:54:00',
        intermediateControl: '15:10:30',
        controlAverage: 14.2,
        arrival: '9:50:15',
        time: '1:56:15',
        arrivalAverage: 14.1,
        recoveryTime: '1:45',
        heartRate: 54
      }
    ],
    vetChecks: [
      {
        phase: 'PRE',
        recoveryTime: '',
        heartRate: 28,
        recIndex: 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      }
    ]
  },
  {
    id: '3',
    name: 'AHMED AL-RASHID',
    nationality: 'UAE',
    horse: mockHorses[2],
    position: 2,
    currentPosition: 3,
    gapToLeader: '+00:05:22.120',
    currentPhase: 2,
    isActive: true,
    totalTime: '6:05:22',
    currentTime: '4:13:39',
    averageSpeed: 13.5,
    points: 65,
    region: 'UAE 105',
    phases: [
      {
        phaseNumber: 1,
        startTime: '07:54:00',
        intermediateControl: '15:12:45',
        controlAverage: 13.95,
        arrival: '9:52:30',
        time: '1:58:30',
        arrivalAverage: 13.9,
        recoveryTime: '1:48',
        heartRate: 56
      }
    ],
    vetChecks: [
      {
        phase: 'PRE',
        recoveryTime: '',
        heartRate: 32,
        recIndex: 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      }
    ]
  },
  {
    id: '4',
    name: 'SOPHIE MARTIN',
    nationality: 'FRA',
    horse: {
      id: '4',
      name: 'LIGHTNING STAR',
      age: 9,
      breed: 'Arabian',
      owner: 'Sophie Martin',
      pastResults: []
    },
    currentPosition: 4,
    gapToLeader: '+00:08:45.890',
    currentPhase: 2,
    isActive: true,
    currentTime: '4:16:03',
    averageSpeed: 12.8,
    region: 'Provence 205',
    phases: [],
    vetChecks: []
  },
  {
    id: '5',
    name: 'HANS MUELLER',
    nationality: 'GER',
    horse: {
      id: '5',
      name: 'ALPINE WIND',
      age: 7,
      breed: 'Anglo-Arabian',
      owner: 'Hans Mueller',
      pastResults: []
    },
    currentPosition: 5,
    gapToLeader: '+00:12:30.560',
    currentPhase: 1,
    isActive: false,
    currentTime: '4:20:48',
    averageSpeed: 12.3,
    region: 'Bavaria 301',
    phases: [],
    vetChecks: []
  },
  {
    id: '6',
    name: 'JEAN DUBOIS',
    nationality: 'FRA',
    horse: {
      id: '6',
      name: 'MISTRAL NOIR',
      age: 8,
      breed: 'Arabian',
      owner: 'Jean Dubois',
      pastResults: []
    },
    currentPosition: 6,
    gapToLeader: '+00:15:22.340',
    currentPhase: 1,
    isActive: false,
    currentTime: '4:23:40',
    averageSpeed: 12.1,
    region: 'Normandy 156',
    phases: [],
    vetChecks: []
  },
  {
    id: '7',
    name: 'CARLOS RODRIGUEZ',
    nationality: 'ESP',
    horse: {
      id: '7',
      name: 'ANDALUZ FUEGO',
      age: 9,
      breed: 'Andalusian',
      owner: 'Carlos Rodriguez',
      pastResults: []
    },
    currentPosition: 7,
    gapToLeader: '+00:18:45.120',
    currentPhase: 2,
    isActive: true,
    currentTime: '4:26:03',
    averageSpeed: 11.8,
    region: 'Andalusia 289',
    phases: [],
    vetChecks: []
  },
  {
    id: '8',
    name: 'SARAH JOHNSON',
    nationality: 'USA',
    horse: {
      id: '8',
      name: 'DESERT STORM',
      age: 7,
      breed: 'Arabian',
      owner: 'Johnson Ranch',
      pastResults: []
    },
    currentPosition: 8,
    gapToLeader: '+00:22:15.890',
    currentPhase: 2,
    isActive: true,
    currentTime: '4:29:33',
    averageSpeed: 11.5,
    region: 'Texas 445',
    phases: [],
    vetChecks: []
  },
  {
    id: '9',
    name: 'ANTONIO SILVA',
    nationality: 'BRA',
    horse: {
      id: '9',
      name: 'PANTANAL SPIRIT',
      age: 6,
      breed: 'Mangalarga',
      owner: 'Silva Stables',
      pastResults: []
    },
    currentPosition: 9,
    gapToLeader: '+00:25:33.450',
    currentPhase: 1,
    isActive: false,
    currentTime: '4:32:51',
    averageSpeed: 11.2,
    region: 'Mato Grosso 178',
    phases: [],
    vetChecks: []
  },
  {
    id: '10',
    name: 'EMMA THOMPSON',
    nationality: 'GBR',
    horse: {
      id: '10',
      name: 'HIGHLAND MIST',
      age: 8,
      breed: 'Anglo-Arabian',
      owner: 'Thompson Equestrian',
      pastResults: []
    },
    currentPosition: 10,
    gapToLeader: '+00:28:12.670',
    currentPhase: 2,
    isActive: true,
    currentTime: '4:35:30',
    averageSpeed: 10.9,
    region: 'Scotland 334',
    phases: [],
    vetChecks: []
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Sprint Race',
    location: 'Pisa, Italy',
    startTime: '2024-07-15T07:00:00',
    endTime: '2024-07-15T16:00:00',
    subscriptionDeadline: '2024-07-10T23:59:59',
    status: 'past',
    categories: [
      {
        id: '1',
        name: 'CEI3* 160',
        eventId: '1',
        riders: mockRiders
      },
      {
        id: '2',
        name: 'CEI2* 120',
        eventId: '1',
        riders: mockRiders.slice(0, 2)
      }
    ]
  },
  {
    id: '2',
    name: 'Mountain Challenge',
    location: 'Alps, Switzerland',
    startTime: '2024-08-20T06:30:00',
    endTime: '2024-08-20T17:30:00',
    subscriptionDeadline: '2024-08-15T23:59:59',
    status: 'past',
    categories: [
      {
        id: '3',
        name: 'CEI3* 140',
        eventId: '2',
        riders: mockRiders.slice(1)
      }
    ]
  },
  {
    id: '3',
    name: 'Desert Challenge',
    location: 'Dubai, UAE',
    startTime: '2024-12-15T08:00:00',
    endTime: '2024-12-15T18:00:00',
    subscriptionDeadline: '2024-12-10T23:59:59',
    status: 'upcoming',
    categories: [
      {
        id: '4',
        name: 'CEI3* 160',
        eventId: '3',
        riders: []
      }
    ]
  },
  {
    id: '4',
    name: 'Spring Classic',
    location: 'Normandy, France',
    startTime: '2025-03-20T07:30:00',
    endTime: '2025-03-20T16:30:00',
    subscriptionDeadline: '2025-03-15T23:59:59',
    status: 'upcoming',
    categories: [
      {
        id: '5',
        name: 'CEI2* 120',
        eventId: '4',
        riders: []
      }
    ]
  },
  {
    id: '5',
    name: 'Autumn Championship',
    location: 'Tuscany, Italy',
    startTime: '2024-11-15T08:00:00',
    endTime: '2024-11-15T17:00:00',
    subscriptionDeadline: '2024-11-10T23:59:59',
    status: 'live',
    categories: [
      {
        id: '6',
        name: 'CEI3* 160',
        eventId: '5',
        riders: mockRiders
      }
    ]
  }
];