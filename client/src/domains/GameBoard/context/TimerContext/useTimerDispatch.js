import { useContext } from 'react';
import { TimerDispatchContext } from './TimerContext';
import {
  SET_IS_TIMER_ACTIVE,
  SET_PASSED_TIME,
  SET_CURRENT_COUNTDOWN,
  RESET_TIMER,
} from '../../../../actions/actions';

export const useTimerDispatch = () => {
  const dispatch = useContext(TimerDispatchContext);

  const stopTimer = () => {
    dispatch({ type: SET_IS_TIMER_ACTIVE, isTimerActive: false });
  };

  const startTimer = () => {
    dispatch({ type: SET_IS_TIMER_ACTIVE, isTimerActive: true });
  };

  const setPassedTime = (passedTime) => {
    dispatch({ type: SET_PASSED_TIME, passedTime });
  };

  const setCurrentCountdown = (currentCountdown) => {
    dispatch({ type: SET_CURRENT_COUNTDOWN, currentCountdown });
  };

  const resetTimer = () => {
    dispatch({ type: RESET_TIMER });
  };

  return {
    stopTimer,
    startTimer,
    setPassedTime,
    setCurrentCountdown,
    resetTimer,
  };
};
