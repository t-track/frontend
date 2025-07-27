import { Event, Rider, Horse, LiveData, Category } from '../types';
import api_example_future_events from './api_example_future_events.json';
import example_live_event from './api_example_live_event.json';
import api_example_results_info from './api_example_results_info.json'

// API endpoints for future events and results info
export const fetchFutureEvents = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockExampleEvents();
};

// API endpoints for event IDs
export const fetchEventIDs = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockEventIDs();
};

export const fetchResultsInfo = async (): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockInfoResults();
};

// Mock data for development
let mockEvents: any[] = [
  {
    id: '1',
    name: 'Summer Sprint Race',
    eventID: '340000',
    location: 'Tuscany Hills',
    startTime: '2024-12-15T08:00:00Z',
    endTime: '2024-12-15T16:00:00Z',
    subscriptionDeadline: '2024-12-10T23:59:59Z',
    backgroundImage: ''
  },
  {
    id: '27',
    name: 'Mountain Challenge',
    eventID: '340001',
    location: 'Alpine Region',
    startTime: '2024-12-20T07:00:00Z',
    endTime: '2024-12-20T18:00:00Z',
    subscriptionDeadline: '2024-12-15T23:59:59Z',
    backgroundImage: ''
  },
  {
    id: '26',
    name: '28° Trofeo Les Grandes Montagnes (2)',
    eventID: '340002',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: ''
  },
  {
    id: '25',
    name: 'MASTER ENERGY CUP (2)',
    eventID: '340003',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: ''
  },
  {
    id: '24',
    name: 'MASTER ENERGY CUP (1)',
    eventID: '340004',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: ''
  },
  {
    id: '23',
    name: '28° Trofeo Les Grandes Montagnes (1)',
    eventID: '340005',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '22',
    name: 'Endurance horse Show Pony',
    eventID: '340006',
    location: 'Samorin (SVK)',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '21',
    name: 'Endurance horse Show Pony',
    eventID: '340007',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '20',
    name: 'Autumn Classic',
    eventID: '340008',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '19',
    name: 'Autumn Classic',
    eventID: '340009',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '18',
    name: 'Autumn Classic',
    eventID: '340010',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '17',
    name: 'Autumn Classic',
    eventID: '340011',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '16',
    name: 'Autumn Classic',
    eventID: '340420',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '15',
    name: 'Autumn Classic',
    eventID: '340501',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '14',
    name: 'Autumn Classic',
    eventID: '341453',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '13',
    name: 'Autumn Classic',
    eventID: '341520',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '12',
    name: 'Autumn Classic',
    eventID: '341665',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '11',
    name: 'Autumn Classic',
    eventID: '342379',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '10',
    name: 'Autumn Classic',
    eventID: '342741',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '9',
    name: 'Autumn Classic',
    eventID: '343452',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    name: 'Autumn Classic',
    eventID: '343526',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    name: 'Autumn Classic',
    eventID: '343879',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    name: 'Autumn Classic',
    eventID: '343880',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Autumn Classic',
    eventID: '343882',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Autumn Classic',
    eventID: '342379',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-15T17:00:00Z',
    subscriptionDeadline: '2024-11-10T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Autumn Classic',
    eventID: '345604',
    location: 'countryside',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2025-7-27T17:00:00Z',
    subscriptionDeadline: '2025-7-27T17T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Autumn Classic',
    eventID: '349041',
    location: 'countryside',
    startTime: '2025-08-23T09:00:00Z',
    endTime: '2025-08-23T17:00:00Z',
    subscriptionDeadline: '2025-08-23T23:59:59Z',
    backgroundImage: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
];
mockEvents = addStatusData(mockEvents);

const getMockEventIDs = (): string[] => [
  "340000","340001","340002","340003","340004","340005","340006","340007","340008","340009","340010",
  "340011","340420","340501","341453","341520","341665","342379","342379","342741","343452","343526",
  "343879","343880","343882","342379","345604","349041"
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

// add status detail to the object based on the dates
function addStatusData(data:any[]){
  data.forEach(event => {
    event.description = '';
    event.categories = [];
      if (new Date(event.endTime) < new Date() && new Date(event.startTime) > new Date() ) {
        event.status = 'live'
      }else if(new Date(event.endTime) < new Date() ){
        event.status =  'finished'
      }else{
        event.status = 'upcoming'
      }
  });
  return data;
}
// add random bdg image if not defined in the object
function addPlaceholderImage(events: Event[]){
  const images = [ 
    "/event_backgrounds/3a369aa6b6_SUMMER_SPIRIT_RACE_1.jpg", 
    "/event_backgrounds/4b585c9f5d_Locandina_Torgnon_2025.jpeg", 
    "/event_backgrounds/4bd06593b1_g_20211130151538.jpg-1280x720.jpg", 
    "/event_backgrounds/1604b7aa3d_locandina_Samorin.jpg" 
  ]
  // index depends on the length of the name
  events.forEach(event => {
    if(event.backgroundImage == "") {
      const index = event.location.length % images.length
      event.backgroundImage = images[index];
    }
  });
  return events
}

export const fetchEvents = async (): Promise<Event[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  mockEvents = addStatusData(mockEvents);
  mockEvents = addPlaceholderImage(mockEvents)
  // sort events by the date
  mockEvents.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
  return mockEvents;
};

export const fetchEventById = async (id: string): Promise<Event | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  addStatusData(mockEvents);
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

export const fetchLiveData = async (apiUrl: string, eventID: string): Promise<LiveData | null> => {
  // Return mock data for development/demo
  await new Promise(resolve => setTimeout(resolve, 300));
  return getMockLiveData();
  if (!apiUrl || apiUrl === 'mock') {
  }
  try {
    const response = await fetch(apiUrl + "/livedata/" + eventID);
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

export const createEvent = async (eventData: {
  id: string;
  name: string;
  startTime: string;
  backgroundImage: string;
  location?: string;
  categories?: string[];
  description?: string;
}): Promise<Event> => {
  const newEvent: Event = {
    id: eventData.id,
    name: eventData.name,
    location: eventData.location || 'TBD',
    startTime: eventData.startTime,
    endTime: new Date(new Date(eventData.startTime).getTime() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours later
    subscriptionDeadline: new Date(new Date(eventData.startTime).getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days before
    backgroundImage: eventData.backgroundImage
  };

  // Add to custom events
  mockEvents.push(newEvent);
  
  // Store in localStorage for persistence
  localStorage.setItem('mockEvents', JSON.stringify(mockEvents));
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return newEvent;
};

export const updateEvent = async (eventId: string, eventData: Partial<Event>): Promise<Event | null> => {
  const eventIndex = mockEvents.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    throw new Error('Event not found');
  }

  // Update the event
  mockEvents[eventIndex] = { ...mockEvents[eventIndex], ...eventData };
  
  // Update localStorage
  localStorage.setItem('mockEvents', JSON.stringify(mockEvents));
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEvents[eventIndex];
};

export const deleteEvent = async (eventId: string): Promise<boolean> => {
  const eventIndex = mockEvents.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) {
    return false;
  }

  mockEvents.splice(eventIndex, 1);
  localStorage.setItem('mockEvents', JSON.stringify(mockEvents));
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return true;
};

export const getMockEvents = (): Event[] => {
  // Load from localStorage on first call
  if (mockEvents.length === 0) {
    const stored = localStorage.getItem('mockEvents');
    if (stored) {
      mockEvents = JSON.parse(stored);
    }
  }
  return mockEvents;
};

// Available cover images
export const getCoverImages = (): { url: string; name: string }[] => [
  {
    url: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Mountain Trail'
  },
  {
    url: 'https://images.pexels.com/photos/1996334/pexels-photo-1996334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Forest Path'
  },
  {
    url: 'https://images.pexels.com/photos/1996335/pexels-photo-1996335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Desert Landscape'
  },
  {
    url: 'https://images.pexels.com/photos/1996327/pexels-photo-1996327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Countryside'
  },
  {
    url: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Coastal Trail'
  }
];
