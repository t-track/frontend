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
    name: 'Test Sprint Race',
    eventID: '345604',
    location: 'Tuscany Hills',
    startTime: '2025-07-31T05:00:00Z',
    endTime: '2025-07-31T22:00:00Z',
    subscriptionDeadline: '2025-7-10T23:59:59Z',
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
      if (new Date(event.endTime).getTime() > new Date().getTime() && new Date(event.startTime).getTime() < new Date().getTime() ) {
        event.status = 'live'
      }else if(new Date(event.endTime).getTime() < new Date().getTime() ){
        event.status =  'finished'
      }else{
        event.status = 'upcoming'
      }
  });
  return data;
}
// add random bdg image if not defined in the object
function addPlaceholderImage(events: Event[]){
  // index depends on the length of the name
  events.forEach(event => {
    if(event.backgroundImage == "") {
      const images: {name: string, url: string }[] = getCoverImages()
      const index = event.location.length % images.length
      event.backgroundImage = images[index].url;
    }
  });
  return events
}

export const fetchEvents = async (apiUrl: string): Promise<Event[]> => {
  const LOCAL_STORAGE_KEY = 'eventsData';

  // Try loading events from localStorage first
  const storedEventsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedEventsJSON) {
    try {
      let storedEvents: Event[] = JSON.parse(storedEventsJSON);
      if (storedEvents && storedEvents.length > 0) {
        // Return processed stored events right away
        storedEvents = addStatusData(storedEvents);
        storedEvents = addPlaceholderImage(storedEvents);
        return storedEvents;
      }
    } catch (e) {
      console.warn('Failed to parse stored events from localStorage, will fetch from API.', e);
    }
  }

  // If no local data or failed to parse, fetch from API
  try {
    const url = apiUrl.endsWith('/') ? apiUrl + 'events' : apiUrl + '/events';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch events from API');

    let events: Event[] = await response.json();

    // Process events
    events = addStatusData(events);
    events = addPlaceholderImage(events);

    // Cache processed events in localStorage for future use
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn('Failed to save events to localStorage.', e);
    }

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);

    // Fallback to mockEvents
    // Assuming mockEvents is an array of Event objects available in scope
    let fallbackEvents = addStatusData(mockEvents);
    fallbackEvents = addPlaceholderImage(fallbackEvents);

    // Optionally, cache mock events so localStorage isn't empty next time
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackEvents));
    } catch (e) {
      console.warn('Failed to save fallback events to localStorage.', e);
    }

    return fallbackEvents;
  }
};

export const fetchEventById = async (apiUrl: string, id: string|null ): Promise<Event | null> => {
  try {
    var url = apiUrl + "events"
    if( id != '' || id !== undefined || id != null ){ url += '/' + id }
  
    const response = await fetch( url );
    if (!response.ok) throw new Error('Failed to fetch live data');
    var event: Event = await response.json()
    var events = addStatusData([event]);
    return events[0];
  }catch{
    var events = addStatusData(mockEvents);
    return events.find(event => event.id === id) || null;
  }
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
 
  if (!apiUrl || apiUrl === 'mock') {
  }
  console.log("apiUrl",apiUrl)
  try {
    const response = await fetch(apiUrl + "livedata/" + eventID );
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

export const createEvent = async (apiUrl: string, eventData: {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  subscriptionDeadline: string;
  backgroundImage: string;
  location?: string;
  categories?: string[];
  description?: string;
}): Promise<Event> => {
  const newEvent: Event = {
    id: eventData.id,
    name: eventData.name,
    location: eventData.location || 'TBD',
    status: 'upcoming',
    categories: [],
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    subscriptionDeadline: eventData.subscriptionDeadline || new Date(new Date(eventData.startTime).getTime() - 5 * 24 * 60 * 60 * 1000).toISOString() , 
    backgroundImage: eventData.backgroundImage
  };

  // Add to custom events
  mockEvents.push(newEvent);
  
  // Store in localStorage for persistence
  localStorage.setItem('mockEvents', JSON.stringify(mockEvents));
  
  await new Promise(resolve => setTimeout(resolve, 300));
  try {
    var url = apiUrl + "events"
    const response = await fetch( url, {
      method: "POST", body: JSON.stringify( newEvent )
    });
    if (!response.ok) throw new Error('Request failed');
  }catch (error) {
    console.log("ERROR: couldn't save event", error)
  }

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



// Available cover images
export const getCoverImages = (): { url: string; name: string }[] => [
  { name: 'alain-moreau', url: '/event_backgrounds/alain-moreau-unsplash.jpg'},
  { name: 'bird-eye-venue', url: '/event_backgrounds/bird-eye-venue-1280x720.jpg'},
  { name: 'dallas-reedy', url: '/event_backgrounds/dallas-reedy-unsplash.jpg'},
  { name: 'daniel-sanchez', url: '/event_backgrounds/daniel-sanchez-unsplash.jpg'},
  { name: 'elena-rabkina', url: '/event_backgrounds/elena-rabkina-unsplash.jpg'},
  { name: 'helena-lopes', url: '/event_backgrounds/helena-lopes-unsplash.jpg'},
  { name: 'jeff-griffith', url: '/event_backgrounds/jeff-griffith-1-nsplash.jpg'},
  { name: 'jeff-griffith', url: '/event_backgrounds/jeff-griffith-unsplash.jpg'},
  { name: 'julia-joppien', url: '/event_backgrounds/julia-joppien-unsplash.jpg'},
  { name: 'keith-luke', url: '/event_backgrounds/keith-luke-unsplash.jpg'},
  // { name: 'Locandina_Samorin', url: '/event_backgrounds/Locandina_Samorin.jpg'},
  // { name: 'Locandina_Torgnon_2025', url: '/event_backgrounds/Locandina_Torgnon_2025.jpeg'},
  // { name: 'mathew-schwartz', url: '/event_backgrounds/mathew-schwartz-5qRWQEdK7Sg-unsplash.jpg'},
  // { name: 'mathias-reding', url: '/event_backgrounds/mathias-reding-ectPPziVG2I-unsplash.jpg'},
  // { name: 'mike-kotsch', url: '/event_backgrounds/mike-kotsch-aZ4HBJf8Gmc-unsplash.jpg'},
  // { name: 'noah-silliman', url: '/event_backgrounds/noah-silliman-fxAo3DiMICI-unsplash.jpg'},
  // { name: 'philippe-gras', url: '/event_backgrounds/philippe-gras-WkvOwzndn94-unsplash.jpg'},
  // { name: 'philippe-oursel', url: '/event_backgrounds/philippe-oursel-3v7qofrkMXk-unsplash.jpg'},
  // { name: 'pietro-mattia', url: '/event_backgrounds/pietro-mattia-zXqizKxnbBU-unsplash.jpg'},
  // { name: 'silje-midtgard', url: '/event_backgrounds/silje-midtgard-0F9oVQ3x2ak-unsplash.jpg'},
  { name: 'SUMMER_SPIRIT_RACE_1', url: '/event_backgrounds/SUMMER_SPIRIT_RACE_1.jpg'},
  { name: 'violeta-pencheva', url: '/event_backgrounds/violeta-pencheva-12dXKDujs40-unsplash.jpg'}
];
