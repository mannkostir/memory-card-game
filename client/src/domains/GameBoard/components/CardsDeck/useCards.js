import { useEffect, useState } from 'react';
import { useCardSelection } from './useCardSelection';
import { useCardsLoading } from './useCardsLoading';
import { useGame } from '../../hooks/useGame';
import { useGameState } from '../../context/GameContext';
import { useTimerDispatch } from '../../context/TimerContext';
import { gameEventTypes, useGameEvents } from '../../context/GameEventsContext';

export const useCards = ({ gameFinishHandler = null }) => {
  const {
    resolvedMatches,
    currentMatches,
    currentLevel,
    levelsAmount,
    gameMode,
  } = useGameState();

  const { startTimer, stopTimer } = useTimerDispatch();

  const { nextLevel, finishGame } = useGame();

  const { emitEvent } = useGameEvents();

  const [selectedCards, setSelectedCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState();

  const { selectCard, isFlipped } = useCardSelection({
    selectedCards,
    setSelectedCards,
    setIsDisabled,
    emitEvent,
  });

  const { handleCardsLoading, isLoaded } = useCardsLoading({
    currentMatches,
    startTimer,
    emitEvent,
  });

  const checkGameCompletion = () => {
    if (resolvedMatches.length === currentMatches.length) {
      stopTimer();

      emitEvent(gameEventTypes.allMatchesResolved, currentMatches);

      if (currentLevel && currentLevel < levelsAmount) {
        emitEvent(gameEventTypes.levelFinished, currentLevel);
        nextLevel();
      } else {
        emitEvent(gameEventTypes.gameFinished, {
          levelsAmount,
          currentLevel,
          gameMode,
        });
        if (gameFinishHandler && typeof gameFinishHandler === 'function') {
          gameFinishHandler();
        } else {
          finishGame();
        }
      }
    }
  };

  useEffect(checkGameCompletion, [resolvedMatches]);

  return {
    selectedCards,
    isDisabled,
    isFlipped,
    selectCard,
    isLoaded,
    handleCardsLoading,
    finishGame,
  };
};
