import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export const useFetchEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (!error) setEvents(data);
    };

    fetchEvents();
  }, []);

  return events;
};
