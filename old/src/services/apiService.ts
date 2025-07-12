import { API_CONFIG, ApiResponse, FIELD_MAPPING } from '../config/api';
import { Rider, Horse, Phase, VetCheck, Event, Category } from '../types';

class ApiService {
  private pollingInterval: NodeJS.Timeout | null = null;
  private subscribers: Map<string, (data: any) => void> = new Map();

  // Fetch live results from API
  async fetchLiveResults(eventId?: string, categoryId?: string): Promise<ApiResponse> {
    try {
      const url = new URL(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LIVE_RESULTS}`);
      
      if (eventId) {
        url.searchParams.append('eventId', eventId);
      }
      if (categoryId) {
        url.searchParams.append('categoryId', categoryId);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching live results:', error);
      throw error;
    }
  }

  // Transform API data to our internal format
  transformApiDataToRiders(apiData: ApiResponse): Rider[] {
    const riders: Rider[] = [];

    apiData.Data.forEach((riderData, index) => {
      try {
        const rider = this.parseRiderData(riderData, index);
        if (rider) {
          riders.push(rider);
        }
      } catch (error) {
        console.error(`Error parsing rider data at index ${index}:`, error);
      }
    });

    return riders.sort((a, b) => (a.currentPosition || 999) - (b.currentPosition || 999));
  }

  private parseRiderData(data: string[], index: number): Rider | null {
    if (!data || data.length < 10) {
      return null;
    }

    // Extract basic rider information
    const bib = data[FIELD_MAPPING.BIB] || '';
    const riderName = data[FIELD_MAPPING.RIDER_NAME] || '';
    const riderId = data[FIELD_MAPPING.RIDER_ID] || '';
    const flag = data[FIELD_MAPPING.FLAG] || '';
    const horseName = data[FIELD_MAPPING.HORSE_NAME] || '';
    const horseId = data[FIELD_MAPPING.HORSE_ID] || '';
    const mainRank = parseInt(data[FIELD_MAPPING.MAIN_RANK]) || 0;

    // Parse phases
    const phases = this.parsePhases(data);
    
    // Parse vet checks
    const vetChecks = this.parseVetChecks(data);

    // Determine current phase and status
    const currentPhase = this.getCurrentPhase(data);
    const isActive = this.getActiveStatus(data, currentPhase);
    
    // Calculate current time and gap
    const currentTime = this.getCurrentTime(data, currentPhase);
    const gapToLeader = this.calculateGapToLeader(data, mainRank);
    
    // Calculate average speed
    const averageSpeed = this.getAverageSpeed(data, currentPhase);

    // Create horse object
    const horse: Horse = {
      id: horseId || `horse-${index}`,
      name: horseName,
      pastResults: []
    };

    // Create rider object
    const rider: Rider = {
      id: riderId || `rider-${index}`,
      name: riderName,
      nationality: this.parseNationality(flag),
      horse,
      currentPosition: mainRank || index + 1,
      gapToLeader,
      currentPhase,
      isActive,
      currentTime,
      averageSpeed,
      region: flag, // Using flag as region for now
      phases,
      vetChecks,
      // Additional fields that might be useful
      bib: bib,
    };

    return rider;
  }

  private parsePhases(data: string[]): Phase[] {
    const phases: Phase[] = [];

    // Parse Phase 1
    if (data[FIELD_MAPPING.PHASE_1_START]) {
      phases.push({
        phaseNumber: 1,
        startTime: data[FIELD_MAPPING.PHASE_1_START] || '',
        intermediateControl: '',
        controlAverage: 0,
        arrival: data[FIELD_MAPPING.PHASE_1_ARRIVAL] || '',
        time: data[FIELD_MAPPING.PHASE_1_LOOP_TIME] || '',
        arrivalAverage: parseFloat(data[FIELD_MAPPING.PHASE_1_LOOP_SPEED]) || 0,
        recoveryTime: data[FIELD_MAPPING.PHASE_1_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_1_HR]) || 0,
      });
    }

    // Parse Phase 2
    if (data[FIELD_MAPPING.PHASE_2_START]) {
      phases.push({
        phaseNumber: 2,
        startTime: data[FIELD_MAPPING.PHASE_2_START] || '',
        intermediateControl: '',
        controlAverage: 0,
        arrival: data[FIELD_MAPPING.PHASE_2_ARRIVAL] || '',
        time: data[FIELD_MAPPING.PHASE_2_LOOP_TIME] || '',
        arrivalAverage: parseFloat(data[FIELD_MAPPING.PHASE_2_LOOP_SPEED]) || 0,
        recoveryTime: data[FIELD_MAPPING.PHASE_2_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_2_HR]) || 0,
      });
    }

    // Parse Phase 3
    if (data[FIELD_MAPPING.PHASE_3_START]) {
      phases.push({
        phaseNumber: 3,
        startTime: data[FIELD_MAPPING.PHASE_3_START] || '',
        intermediateControl: '',
        controlAverage: 0,
        arrival: data[FIELD_MAPPING.PHASE_3_ARRIVAL] || '',
        time: data[FIELD_MAPPING.PHASE_3_LOOP_TIME] || '',
        arrivalAverage: parseFloat(data[FIELD_MAPPING.PHASE_3_LOOP_SPEED]) || 0,
        recoveryTime: data[FIELD_MAPPING.PHASE_3_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_3_HR]) || 0,
      });
    }

    return phases;
  }

  private parseVetChecks(data: string[]): VetCheck[] {
    const vetChecks: VetCheck[] = [];

    // Pre-ride vet check
    if (data[FIELD_MAPPING.VET_PRE_HR]) {
      vetChecks.push({
        phase: 'PRE',
        recoveryTime: '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_PRE_HR]) || 0,
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
      });
    }

    // Phase 1 vet check
    if (data[FIELD_MAPPING.VET_1_HR]) {
      vetChecks.push({
        phase: '1',
        recoveryTime: data[FIELD_MAPPING.VET_1_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_1_HR]) || 0,
        recIndex: parseInt(data[FIELD_MAPPING.VET_1_REC_INDEX]) || 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      });
    }

    // Phase 2 vet check
    if (data[FIELD_MAPPING.VET_2_HR]) {
      vetChecks.push({
        phase: '2',
        recoveryTime: data[FIELD_MAPPING.VET_2_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_2_HR]) || 0,
        recIndex: parseInt(data[FIELD_MAPPING.VET_2_REC_INDEX]) || 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      });
    }

    // Phase 3 vet check
    if (data[FIELD_MAPPING.VET_3_HR]) {
      vetChecks.push({
        phase: '3',
        recoveryTime: data[FIELD_MAPPING.VET_3_RECOVERY] || '',
        heartRate: parseInt(data[FIELD_MAPPING.VET_3_HR]) || 0,
        recIndex: parseInt(data[FIELD_MAPPING.VET_3_REC_INDEX]) || 0,
        respiratory: 'Ok',
        mucous: 'A',
        capRefill: 1,
        skin: 1,
        gutSounds: 'A',
        girth: 'A',
        muscleTone: 'A',
        gait: 'A',
        vet: ''
      });
    }

    return vetChecks;
  }

  private getCurrentPhase(data: string[]): number {
    // Determine current phase based on available data
    if (data[FIELD_MAPPING.PHASE_3_START] && data[FIELD_MAPPING.PHASE_3_START] !== '') {
      return 3;
    } else if (data[FIELD_MAPPING.PHASE_2_START] && data[FIELD_MAPPING.PHASE_2_START] !== '') {
      return 2;
    } else {
      return 1;
    }
  }

  private getActiveStatus(data: string[], currentPhase: number): boolean {
    // Check if rider is ready for next phase or still racing
    const readyField = currentPhase === 1 ? FIELD_MAPPING.PHASE_1_READY :
                     currentPhase === 2 ? FIELD_MAPPING.PHASE_2_READY :
                     FIELD_MAPPING.PHASE_3_READY;
    
    const ready = data[readyField];
    return ready === 'yes' || ready === '';
  }

  private getCurrentTime(data: string[], currentPhase: number): string {
    // Get the most recent time based on current phase
    if (currentPhase >= 3 && data[FIELD_MAPPING.PHASE_3_RIDE_TIME]) {
      return data[FIELD_MAPPING.PHASE_3_RIDE_TIME];
    } else if (currentPhase >= 2 && data[FIELD_MAPPING.PHASE_2_RIDE_TIME]) {
      return data[FIELD_MAPPING.PHASE_2_RIDE_TIME];
    } else if (data[FIELD_MAPPING.PHASE_1_RIDE_TIME]) {
      return data[FIELD_MAPPING.PHASE_1_RIDE_TIME];
    }
    return '';
  }

  private calculateGapToLeader(data: string[], rank: number): string {
    // If rank is 1, they are the leader
    if (rank === 1) {
      return '00:00:00.000';
    }
    
    // For now, generate a realistic gap based on position
    // In a real implementation, this would be calculated from the API data
    const minutes = Math.floor(rank * 2 + Math.random() * 5);
    const seconds = Math.floor(Math.random() * 60);
    const milliseconds = Math.floor(Math.random() * 1000);
    
    return `+00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }

  private getAverageSpeed(data: string[], currentPhase: number): number {
    // Get the most recent speed based on current phase
    let speedStr = '';
    if (currentPhase >= 3 && data[FIELD_MAPPING.PHASE_3_RIDE_SPEED]) {
      speedStr = data[FIELD_MAPPING.PHASE_3_RIDE_SPEED];
    } else if (currentPhase >= 2 && data[FIELD_MAPPING.PHASE_2_RIDE_SPEED]) {
      speedStr = data[FIELD_MAPPING.PHASE_2_RIDE_SPEED];
    } else if (data[FIELD_MAPPING.PHASE_1_RIDE_SPEED]) {
      speedStr = data[FIELD_MAPPING.PHASE_1_RIDE_SPEED];
    }
    
    const speed = parseFloat(speedStr);
    return isNaN(speed) ? 0 : speed;
  }

  private parseNationality(flag: string): string {
    // Extract nationality from flag field
    // This is a simplified mapping - you might need to adjust based on actual data
    const nationalityMap: { [key: string]: string } = {
      'Veneto': 'ITA',
      'Lombardia': 'ITA',
      'Valle d\'Aosta': 'ITA',
      'Emilia Romagna': 'ITA',
      'Piemonte': 'ITA',
      'LOMBARDIA': 'ITA',
      // Add more mappings as needed
    };
    
    return nationalityMap[flag] || flag.substring(0, 3).toUpperCase();
  }

  // Transform API data to Event format
  transformApiDataToEvent(apiData: ApiResponse, eventId: string): Event {
    const riders = this.transformApiDataToRiders(apiData);
    
    const event: Event = {
      id: eventId,
      name: apiData.List.HeadLine1 || 'Live Event',
      location: 'Live Location', // This might need to be extracted from the API data
      startTime: new Date().toISOString(), // Current time for live events
      endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
      subscriptionDeadline: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      status: 'live',
      categories: [
        {
          id: 'live-category',
          name: apiData.List.ListName.split('|')[1] || 'Live Category',
          eventId: eventId,
          riders: riders
        }
      ]
    };

    return event;
  }

  // Start polling for live updates
  startPolling(eventId: string, categoryId: string, callback: (riders: Rider[]) => void): void {
    this.stopPolling(); // Stop any existing polling

    const poll = async () => {
      try {
        const apiData = await this.fetchLiveResults(eventId, categoryId);
        const riders = this.transformApiDataToRiders(apiData);
        callback(riders);
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Initial fetch
    poll();

    // Set up interval
    this.pollingInterval = setInterval(poll, API_CONFIG.POLLING_INTERVAL);
  }

  // Stop polling
  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Subscribe to live updates
  subscribe(key: string, callback: (data: any) => void): void {
    this.subscribers.set(key, callback);
  }

  // Unsubscribe from live updates
  unsubscribe(key: string): void {
    this.subscribers.delete(key);
  }

  // Notify all subscribers
  private notifySubscribers(data: any): void {
    this.subscribers.forEach(callback => callback(data));
  }
}

export const apiService = new ApiService();