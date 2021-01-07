import React, { useState } from 'react';
import { useMount } from 'hooks/useMount';
import CardsDeck from '../CardsDeck';
import Countdown from '../Countdown';
import { useGameEvents, gameEventTypes } from '../../context/GameEventsContext';
import { useTimerState } from '../../context/TimerContext';
import { useGame } from '../../hooks/useGame';
import Timer from '../Timer';

export const FocusGame = () => {
  const { resetGame } = useGame();

  const [isCardsRevealed, setIsCardsRevealed] = useState(false);

  const { subscribe } = useGameEvents();

  const { currentCountdown } = useTimerState();

  const [isCountdownFinished, setIsCountdownFinished] = useState(false);

  const revealCards = () => {
    if (currentCountdown.isOver) return;

    setIsCardsRevealed(true);
  };

  const hideCards = () => {
    setIsCardsRevealed(false);
  };

  const finishGame = () => {
    alert('Wrong :(');
    resetGame();
  };

  useMount(() => {
    subscribe(gameEventTypes.loadingCompleted, () => revealCards());
    subscribe(gameEventTypes.countdownOver, () => hideCards());
    subscribe(gameEventTypes.matchedUnsuccessfully, () => finishGame());
  });

  return (
    <CardsDeck
      isCardsRevealed={isCardsRevealed}
      timer={
        isCountdownFinished ? (
          <Timer style={{ fontSize: '1.5em' }} />
        ) : (
          <Countdown
            style={{ fontSize: '1.5em' }}
            fromSeconds={5}
            onFinish={() => {
              setIsCountdownFinished(true);
            }}
          />
        )
      }
    />
  );
};
