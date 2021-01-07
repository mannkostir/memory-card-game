import React, { createContext, useState } from 'react';

export const GameEventsContext = createContext();

export const GameEventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  return (
    <GameEventsContext.Provider value={[events, setEvents]}>
      {children}
    </GameEventsContext.Provider>
  );
};
