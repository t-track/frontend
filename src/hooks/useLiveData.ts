import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { Rider, Event } from '../types';

interface UseLiveDataOptions {
  eventId?: string;
  categoryId?: string;
  enabled?: boolean;
}

interface UseLiveDataReturn {
  riders: Rider[];
  event: Event | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

export const useLiveData = (options: UseLiveDataOptions = {}): UseLiveDataReturn => {
  const { eventId, categoryId, enabled = true } = options;
  
  const [riders, setRiders] = useState<Rider[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled || !eventId) return;

    try {
      setLoading(true);
      setError(null);

      const apiData = await apiService.fetchLiveResults(eventId, categoryId);
      const transformedRiders = apiService.transformApiDataToRiders(apiData);
      const transformedEvent = apiService.transformApiDataToEvent(apiData, eventId);

      setRiders(transformedRiders);
      setEvent(transformedEvent);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch live data';
      setError(errorMessage);
      console.error('Error fetching live data:', err);
    } finally {
      setLoading(false);
    }
  }, [eventId, categoryId, enabled]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!enabled || !eventId) return;

    // Initial fetch
    fetchData();

    // Start polling for live updates
    const handleLiveUpdate = (updatedRiders: Rider[]) => {
      setRiders(updatedRiders);
      setLastUpdated(new Date());
    };

    if (categoryId) {
      apiService.startPolling(eventId, categoryId, handleLiveUpdate);
    }

    // Cleanup
    return () => {
      apiService.stopPolling();
    };
  }, [eventId, categoryId, enabled, fetchData]);

  return {
    riders,
    event,
    loading,
    error,
    lastUpdated,
    refetch,
  };
};