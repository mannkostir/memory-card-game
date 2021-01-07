import { useCallback } from 'react';
import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

export const useLoadingContext = (key = '') => {
  const [state, setState] = useContext(LoadingContext);

  // TODO: In case of more complex operations with loading screen consider using queue ADT

  const setLoaderVisibility = useCallback(
    (isLoaderVisible = true) => {
      if (!key) return;
      setState((state) => ({
        ...state,
        [key]: { ...state[key], isLoaderVisible },
      }));
    },
    [key, setState]
  );

  return {
    isLoaderVisible: state?.isLoaderVisible,
    setLoaderVisibility,
  };
};
