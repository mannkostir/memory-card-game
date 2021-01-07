import React from 'react';
import { useInterval } from 'hooks/useInterval';
import { useMount } from 'hooks/useMount';
import { useTimerContext } from '../../context/TimerContext';
import { gameEventTypes, useGameEvents } from '../../context/GameEventsContext';

const Countdown = ({ fromSeconds = 5, onFinish = () => {}, ...args }) => {
  const {
    isTimerActive,
    currentCountdown,
    setCurrentCountdown,
    updateCurrentCountdown,
  } = useTimerContext();

  const { seconds, minutes, isOver } = currentCountdown;

  const { emitEvent } = useGameEvents();

  useMount(() => {
    if (fromSeconds && !isOver) {
      const initialMinutes = Math.floor(fromSeconds / 60);
      const initialSeconds = fromSeconds % 60;

      updateCurrentCountdown((countdown) => ({
        ...countdown,
        seconds: initialSeconds,
        minutes: initialMinutes,
        isOver: false,
      }));
    }
    return () => updateCurrentCountdown((countdown) => ({ ...countdown }));
  });

  useInterval(() => {
    if (!isTimerActive) return;

    if (seconds > 0) {
      updateCurrentCountdown((countdown) => ({
        ...countdown,
        seconds: seconds - 1,
      }));
    } else if (minutes > 0) {
      updateCurrentCountdown((countdown) => ({
        ...countdown,
        seconds: 59,
        minutes: minutes - 1,
      }));
    } else {
      updateCurrentCountdown((countdown) => ({ ...countdown, isOver: true }));

      emitEvent(gameEventTypes.countdownOver);
      onFinish();
    }
  }, 1000);

  return (
    <div aria-label="countdown" {...args}>
      {isTimerActive &&
        `${minutes < 10 ? '0' + minutes : minutes}:${
          seconds < 10 ? '0' + seconds : seconds
        }`}
    </div>
  );
};

export default Countdown;
