import { useGameState } from './useGameState';
import { useGameDispatch } from './useGameDispatch';

export const useGameContext = () => {
  const state = useGameState();
  const dispatch = useGameDispatch();

  const { resolvedMatches, currentScore, currentLevel } = state;
  const { setCurrentScore, setCurrentLevel, setResolvedMatches } = dispatch;

  const updateResolvedMatches = (updateFn) => {
    const updatedValue = updateFn(resolvedMatches);
    setResolvedMatches(updatedValue);
  };

  const updateCurrentScore = (updateFn) => {
    const updatedValue = updateFn(currentScore);
    setCurrentScore(updatedValue);
  };

  const updateCurrentLevel = (updateFn) => {
    const updatedValue = updateFn(currentLevel);
    setCurrentLevel(updatedValue);
  };

  return {
    ...state,
    ...dispatch,
    updateResolvedMatches,
    updateCurrentScore,
    updateCurrentLevel,
  };
};
