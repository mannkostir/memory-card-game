import { useState, useEffect, useMemo } from 'react';
import { gameEventTypes } from '../../context/GameEventsContext';
import { useLoading } from 'hooks/useLoading';

export const useCardsLoading = ({ currentMatches, startTimer, emitEvent }) => {
  const [cardsLoadedCounter, setCardsLoadedCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { finishLoading, startLoading } = useLoading(false, true);

  useEffect(() => {
    setIsLoaded(false);
  }, [currentMatches]);

  useEffect(() => {
    isLoaded ? finishLoading() : startLoading();
  }, [isLoaded, finishLoading, startLoading]);

  const isAllCardsLoaded = useMemo(() => {
    return cardsLoadedCounter === currentMatches.length - 1;
  }, [cardsLoadedCounter, currentMatches]);

  const handleCardsLoading = () => {
    setCardsLoadedCounter((counter) => ++counter);
    if (isAllCardsLoaded) {
      startTimer();
      setIsLoaded(true);
      setCardsLoadedCounter(0);

      emitEvent(gameEventTypes.loadingCompleted, cardsLoadedCounter);
    }
  };

  return { isLoaded, handleCardsLoading, setIsLoaded };
};
