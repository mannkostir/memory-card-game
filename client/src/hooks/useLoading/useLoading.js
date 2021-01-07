import { useMount } from 'hooks/useMount';
import { useCallback } from 'react';
import { useState } from 'react';

export const useLoading = (initialState = false, disablePointer = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  // Finish loading on unmount
  useMount(() => finishLoading);

  const startLoading = useCallback(() => {
    document.documentElement.style.cursor = 'progress';
    if (disablePointer) {
      document.documentElement.style.pointerEvents = 'none';
    }
    setIsLoading(true);
  }, [setIsLoading, disablePointer]);

  const finishLoading = useCallback(() => {
    document.documentElement.style.cursor = 'default';
    if (disablePointer) {
      document.documentElement.style.pointerEvents = 'auto';
    }
    setIsLoading(false);
  }, [setIsLoading, disablePointer]);

  return { isLoading, startLoading, finishLoading };
};
