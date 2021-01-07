import { timerActionTypes } from '../actions/timerActions';
import { localStorageKeys } from '../constants/localStorageKeys';
import { defaultTimerState } from '../context/TimerContext/TimerContext';

export const timerReducer = (state, action) => {
  switch (action.type) {
    case timerActionTypes.SET_PASSED_TIME:
      const { passedTime } = action;
      localStorage.setItem(
        localStorageKeys.timerState,
        JSON.stringify({ ...state, passedTime })
      );
      return { ...state, passedTime };

    case timerActionTypes.SET_CURRENT_COUNTDOWN:
      const { currentCountdown } = action;
      localStorage.setItem(
        localStorageKeys.timerState,
        JSON.stringify({ ...state, currentCountdown })
      );
      return { ...state, currentCountdown };

    case timerActionTypes.SET_IS_TIMER_ACTIVE:
      const { isTimerActive } = action;
      return { ...state, isTimerActive };

    case timerActionTypes.RESET_TIMER:
      localStorage.removeItem(localStorageKeys.timerState);
      return defaultTimerState;

    default:
      throw new Error('Unhandled action type');
  }
};
