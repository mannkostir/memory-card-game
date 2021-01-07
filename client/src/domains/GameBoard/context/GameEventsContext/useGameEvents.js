import { useContext } from 'react';
import { GameEventsContext } from './GameEventsContext';
import { useMount } from 'hooks/useMount';

export const useGameEvents = () => {
  const [events, setEvents] = useContext(GameEventsContext);

  useMount(() => setEvents([]));

  const emitEvent = (event, data) => {
    if (!events[event]) return;

    events[event](data);
  };

  const subscribe = (event, callback) => {
    setEvents((events) => ({ ...events, [event]: callback }));
  };

  return { emitEvent, subscribe };
};
