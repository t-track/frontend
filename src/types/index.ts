export interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  subscriptionDeadline: string;
  status: 'upcoming' | 'live' | 'finished';
  categories: string[];
  backgroundImage: string;
  description?: string;
}

export interface Rider {
  id: string;
  name: string;
  nationality: string;
  club: string;
  region: string;
  fiseId: string;
  horseId: string;
  horseName: string;
  position?: number;
  totalTime?: string;
  phases: Phase[];
  veterinaryChecks: VeterinaryCheck[];
}

export interface Horse {
  id: string;
  name: string;
  fiseId: string;
  age?: number;
  breed?: string;
  owner?: string;
  results: HorseResult[];
}

export interface Phase {
  phase: number;
  km: number;
  startTime: string;
  arrivalTime: string;
  loopTime: string;
  speed: number;
  inTime: string;
  recoveryTime: string;
  phaseSpeed: number;
  rideTime: string;
  rank?: number;
  gap?: string;
}

export interface VeterinaryCheck {
  phase: string;
  recoveryTime?: string;
  heartRate: number;
  respiration: string;
  mucous: string;
  capillaryRefill: string;
  skin: string;
  gutSounds: string;
  girth: string;
  muscleTone: string;
  gait: string;
  veterinary: string;
}

export interface HorseResult {
  eventId: string;
  eventName: string;
  date: string;
  position: number;
  riderId: string;
  riderName: string;
}

export interface LiveData {
  List: {
    ListName: string;
    HeadLine1: string;
    Fields: Array<{
      Expression: string;
      Label: string;
    }>;
  };
  Data: string[][];
  DataFields: string[];
}

export interface Category {
  id: string;
  name: string;
  distance: number;
  description: string;
}