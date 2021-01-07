import Preloader from 'components/Preloader';
import { useMount } from 'hooks/useMount';
import React, { createContext, useState } from 'react';
import { useMemo } from 'react';

export const defaultLoadingState = {
  initial: {
    isLoaderVisible: true,
  },
};

export const LoadingContext = createContext(defaultLoadingState);

export const LoadingProvider = ({ children }) => {
  const [state, setState] = useState(defaultLoadingState);

  useMount(() => {
    setState(({ initial, ...state }) => state);
  });

  const isLoaderVisible = useMemo(() => {
    return Object.values(state).some((value) => value.isLoaderVisible === true);
  }, [state]);

  return (
    <LoadingContext.Provider value={[state, setState]}>
      <Preloader isVisible={isLoaderVisible} />
      {children}
    </LoadingContext.Provider>
  );
};
