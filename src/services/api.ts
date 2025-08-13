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
let mockEvents: any[] = [];

const LOCAL_STORAGE_KEY = 'eventsData1';
const LOCAL_STORAGE_TIME_KEY = 'eventsDataUpdated';
const CACHE_MAX_AGE_MS = 60_000; // 60s 


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
        eventID: '1',
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
  const now = Date.now();
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  const cacheTime = Number(localStorage.getItem(LOCAL_STORAGE_TIME_KEY) || '0');
  // Use cache if it's fresh
  if (cached && (now - cacheTime < CACHE_MAX_AGE_MS)) {
    try {
      let events: Event[] = JSON.parse(cached);
      events = addStatusData(events);
      events = addPlaceholderImage(events);
      return events;
    } catch {}
  }

  // Otherwise fetch from API
  try {
    const url = apiUrl.endsWith('/') ? apiUrl + 'events' : apiUrl + '/events';
    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');
    let events: Event[] = await response.json();
    events = addStatusData(events);
    events = addPlaceholderImage(events);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    localStorage.setItem(LOCAL_STORAGE_TIME_KEY, now.toString());
    return events;
  } catch (error) {
    console.error('Fetch error:', error);
    // Fallback: try old cache if exists
    if (cached) {
      try {
        let events: Event[] = JSON.parse(cached);
        events = addStatusData(events);
        events = addPlaceholderImage(events);
        return events;
      } catch {}
    }
    return [];
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

export const fetchLiveData = async (
    apiUrl: string, 
    eventID: string
  ): Promise<LiveData | null> => {
  // Return mock data for development/demo
  await new Promise(resolve => setTimeout(resolve, 300));
 
  if (!apiUrl || apiUrl === 'mock') {
  }
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

export const createEvent = async (
  apiUrl: string, 
  eventData: {
    _id: string;
    eventID: string;
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
    _id: '',
    eventID: eventData.eventID,
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
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockEvents));
  
  // await new Promise(resolve => setTimeout(resolve, 300));
  try {
    var url = apiUrl + "events"
    const response = await fetch( url, {
      headers: { "Content-Type": "application/json" },
      method: "POST", body: JSON.stringify( newEvent )
    });
    if (!response.ok) throw new Error('Request failed');
  }catch (error) {
    console.log("ERROR: couldn't save event", error)
  }
  return newEvent;
};

export const updateEvent = async (
  id: string,
  eventData: Partial<Event>,
  apiUrl?: string
): Promise<Event | null> => {
  try {
    // Load the current events (from localStorage/API via fetchEvents)
    let events = await fetchEvents(apiUrl || '');
    const eventIndex = events.findIndex((event) => event._id === id);

    if (eventIndex === -1) throw new Error('Event not found');

    // Merge the incoming update into the local event object
    events[eventIndex] = { ...events[eventIndex], ...eventData };

    let updatedEvent = events[eventIndex];

    // --- API UPDATE ---
    if (apiUrl) {
      try {
        const url = apiUrl.endsWith('/')
          ? `${apiUrl}events`
          : `${apiUrl}/events`;

        const resp = await fetch(url, {
          method: 'POST', // backend expects POST
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEvent), // send full event
        });

        if (!resp.ok) {
          throw new Error(`API update failed with status ${resp.status}`);
        }

        // Replace the updated event with the one returned from the API
        const returnedData: Event = await resp.json();
        events[eventIndex] = returnedData;
        updatedEvent = returnedData;

        console.log('Event successfully updated in API:', returnedData);
      } catch (apiError) {
        console.warn('API update failed, keeping local changes:', apiError);
      }
    }

    // --- LOCAL STORAGE UPDATE ---
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));

    return updatedEvent;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
};

export const deleteEvent = async (
  eventID: string,
  apiUrl: string
): Promise<Event[]> => {
  try {
    // Load current events (using smart caching)
    let events = await fetchEvents( apiUrl );
    const eventIndex = events.findIndex((event) => event._id === eventID);

    if (eventIndex === -1) {
      console.warn(`Event with ID ${eventID} not found`);
      return [];
    }
    // Keep the event in case API fails and we need to rollback
    const deletedEvent = events[eventIndex];

    // --- API DELETE ---
    if (apiUrl) {
      try {
        const url = apiUrl.endsWith('/')
          ? `${apiUrl}events/${eventID}`
          : `${apiUrl}/events/${eventID}`;

        const resp = await fetch(url, { method: 'DELETE' });
        if (!resp.ok) {
          throw new Error(`API delete failed with status ${resp.status}`);
        }

        console.log(`Event ${eventID} successfully deleted in API`);
        // If API deleted successfully, proceed to remove locally
      } catch (apiError) {
        console.warn(`API delete failed for event ${eventID}:`, apiError);
        console.warn(`Removing ${eventID} locally only`);
      }
    }

    // --- LOCAL STORAGE UPDATE ---
    events.splice(eventIndex, 1); // remove from array
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));

    return events;
  } catch (error) {
    console.error('Error deleting event:', error);
    return [];
  }
};

export const fetchRidersByCategory = async (eventID: string, categoryId: string): Promise<Rider[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockRiders.filter(rider => rider.id === '1'); // Mock filtering
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
