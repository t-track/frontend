export interface Event {
  id: string;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  subscriptionDeadline: string;
  status: 'upcoming' | 'past' | 'live';
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  eventId: string;
  riders: Rider[];
}

export interface Rider {
  id: string;
  name: string;
  nationality: string;
  horse: Horse;
  position?: number;
  currentPosition?: number;
  gapToLeader?: string;
  currentPhase?: number;
  isActive?: boolean;
  totalTime?: string;
  currentTime?: string;
  averageSpeed?: number;
  points?: number;
  region: string;
  phases: Phase[];
  vetChecks: VetCheck[];
  bib?: string;
}

export interface Horse {
  id: string;
  name: string;
  age?: number;
  breed?: string;
  owner?: string;
  pastResults?: Result[];
}

export interface Phase {
  phaseNumber: number;
  startTime: string;
  intermediateControl: string;
  controlAverage: number;
  arrival: string;
  time: string;
  arrivalAverage: number;
  recoveryTime: string;
  heartRate: number;
  totalAnticipation?: string;
  scoringTime?: string;
  scoringAverage?: number;
  score?: number;
}

export interface VetCheck {
  phase: string;
  recoveryTime: string;
  heartRate: number;
  recIndex: number;
  respiratory: string;
  mucous: string;
  capRefill: number;
  skin: number;
  gutSounds: string;
  girth: string;
  muscleTone: string;
  gait: string;
  vet: string;
}

export interface Result {
  eventId: string;
  eventName: string;
  date: string;
  position: number;
  category: string;
}