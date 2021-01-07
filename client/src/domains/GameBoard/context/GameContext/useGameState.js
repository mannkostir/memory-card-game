import { useContext, useMemo } from 'react';
import { GameStateContext } from './GameContext';

export const useGameState = () => {
  const {
    currentMatches,
    resolvedMatches,
    matchesAmount,
    currentLevel,
    levels,
    currentScore,
    gameMode,
  } = useContext(GameStateContext);

  const isModeSelected = useMemo(() => {
    return !!gameMode;
  }, [gameMode]);

  const isGameConfigured = useMemo(() => {
    return currentMatches.length;
  }, [currentMatches]);

  const levelsAmount = useMemo(() => {
    return levels.length - 1;
  }, [levels.length]);

  return {
    currentMatches,
    resolvedMatches,
    matchesAmount,
    currentLevel,
    levels,
    levelsAmount,
    currentScore,
    gameMode,
    isModeSelected,
    isGameConfigured,
  };
};
