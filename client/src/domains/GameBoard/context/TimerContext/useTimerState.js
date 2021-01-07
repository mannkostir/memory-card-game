import { useContext } from 'react';
import { TimerStateContext } from './TimerContext';

export const useTimerState = () => {
  const { passedTime, currentCountdown, isTimerActive } = useContext(
    TimerStateContext
  );

  return { passedTime, currentCountdown, isTimerActive };
};
