import { Event, Rider, Horse, LiveData, Category } from '../types';
import api_example_future_events from './api_example_future_events.json';
import example_live_event from './api_example_live_event.json';
import api_example_results_info from './api_example_results_info.json'

// API endpoints for future events and results info
export const fetchFutureEvents = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockExampleEvents();
};

export const fetchResultsInfo = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockInfoResults();
};

// Mock data for development
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Sprint Race',
    location: 'Tuscany Hills',
    startTime: '2024-12-15T08:00:00Z',
    endTime: '2024-12-15T16:00:00Z',
    subscriptionDeadline: '2024-12-10T23:59:59Z',
    status: 'live',
    categories: ['CEI3* 160', 'CEI3* 140'],
    backgroundImage: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Annual summer endurance race through the beautiful Tuscan countryside'
  },
  {
    id: '2',
    name: 'Mountain Challenge',
    location: 'Alpine Region',
    startTime: '2024-12-20T07:00:00Z',
    endTime: '2024-12-20T18:00:00Z',
    subscriptionDeadline: '2024-12-15T23:59:59Z',
    status: 'upcoming',
    categories: ['CEI2* 120', 'CEI1* 90'],
    backgroundImage: 'https://images.pexels.com/photos/1996334/pexels-photo-1996334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Challenging mountain endurance race with stunning alpine views'
  },
  {
    id: '3',
    name: 'Autumn Classic',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    status: 'finished',
    categories: ['CEI3* 160'],
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Classic autumn endurance race with beautiful fall scenery'
  }
];

const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'BELLAGENTE CLAUDIO',
    nationality: 'ITA',
    club: 'OFENA BOSANA',
    region: 'Emilia Romagna',
    fiseId: '424',
    horseId: '1',
    horseName: 'THUNDER BOLT',
    position: 1,
    totalTime: '6:13:18',
    phases: [
      {
        phase: 1,
        km: 40,
        startTime: '07:54:00',
        arrivalTime: '15:15:09',
        loopTime: '2:01:07',
        speed: 13.89,
        inTime: '9:55:08',
        recoveryTime: '1:52',
        phaseSpeed: 13.87,
        rideTime: '9:57:00',
        rank: 1,
        gap: '00:00:00'
      }
    ],
    veterinaryChecks: [
      {
        phase: 'PRE',
        heartRate: 30,
        respiration: 'Ok',
        mucous: 'A',
        capillaryRefill: '1',
        skin: '1',
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        veterinary: 'Ok'
      }
    ]
  }
];

const mockHorses: Horse[] = [
  {
    id: '1',
    name: 'THUNDER BOLT',
    fiseId: 'H001',
    age: 8,
    breed: 'Arabian',
    owner: 'Claudio Bellagente',
    results: [
      {
        eventId: '1',
        eventName: 'Summer Sprint Race',
        date: '2024-12-15',
        position: 1,
        riderId: '1',
        riderName: 'BELLAGENTE CLAUDIO'
      }
    ]
  }
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'CEI3* 160',
    distance: 160,
    description: '160km endurance race with 3 phases'
  },
  {
    id: '2',
    name: 'CEI3* 140',
    distance: 140,
    description: '140km endurance race with 3 phases'
  }
];

export const fetchEvents = async (): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents;
};

export const fetchEventById = async (id: string): Promise<Event | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEvents.find(event => event.id === id) || null;
};

export const fetchRiders = async (): Promise<Rider[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRiders;
};

export const fetchRiderById = async (id: string): Promise<Rider | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRiders.find(rider => rider.id === id) || null;
};

export const fetchHorses = async (): Promise<Horse[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHorses;
};

export const fetchHorseById = async (id: string): Promise<Horse | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockHorses.find(horse => horse.id === id) || null;
};

export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockCategories;
};

export const fetchLiveData = async (apiUrl: string): Promise<LiveData | null> => {
  // Return mock data for development/demo
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockLiveData();
  if (!apiUrl || apiUrl === 'mock') {
  }
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch live data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching live data:', error);
    // Fallback to mock data on error
    return getMockLiveData();
  }
};

const getMockLiveData = (): LiveData => example_live_event as LiveData;
const getMockInfoResults = (): any => api_example_results_info;
const getMockExampleEvents = (): any => api_example_future_events;


export const fetchRidersByCategory = async (eventId: string, categoryId: string): Promise<Rider[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockRiders.filter(rider => rider.id === '1'); // Mock filtering
};