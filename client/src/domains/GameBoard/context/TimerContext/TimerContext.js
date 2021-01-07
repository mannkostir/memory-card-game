import React, { createContext, useReducer } from 'react';
import { timerReducer } from '../../reducers/timerReducer';
import { useMount } from 'hooks/useMount';
import { SET_PASSED_TIME, SET_CURRENT_COUNTDOWN } from 'actions/actions';

export const TimerStateContext = createContext();
export const TimerDispatchContext = createContext();

export const defaultTimerState = {
  passedTime: { seconds: 0, minutes: 0 },
  currentCountdown: { seconds: 0, minutes: 0, isOver: false },
  isTimerActive: false,
};

export const TimerProvider = ({ children, passedState = {} }) => {
  const [state, dispatch] = useReducer(timerReducer, defaultTimerState);

  useMount(() => {
    const timerStateStorage = JSON.parse(localStorage.getItem('timerState'));

    if (timerStateStorage) {
      const { passedTime, currentCountdown } = timerStateStorage;

      if (passedTime) dispatch({ type: SET_PASSED_TIME, passedTime });

      if (currentCountdown)
        dispatch({ type: SET_CURRENT_COUNTDOWN, currentCountdown });
    }
  });

  return (
    <TimerStateContext.Provider value={{ ...state, ...passedState }}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerStateContext.Provider>
  );
};
