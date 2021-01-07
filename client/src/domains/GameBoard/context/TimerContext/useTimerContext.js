import { useTimerState } from './useTimerState';
import { useTimerDispatch } from './useTimerDispatch';

export const useTimerContext = () => {
  const state = useTimerState();
  const dispatch = useTimerDispatch();

  const { passedTime, currentCountdown } = state;
  const { setPassedTime, setCurrentCountdown } = dispatch;

  const updatePassedTime = (updateFn) => {
    const updatedValue = updateFn(passedTime);
    setPassedTime(updatedValue);
  };

  const updateCurrentCountdown = (updateFn) => {
    const updatedValue = updateFn(currentCountdown);
    setCurrentCountdown(updatedValue);
  };

  return {
    ...state,
    ...dispatch,
    updatePassedTime,
    updateCurrentCountdown,
  };
};
