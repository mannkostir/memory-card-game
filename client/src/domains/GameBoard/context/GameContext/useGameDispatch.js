import { gameActionTypes as actionTypes } from '../../actions/gameActions';
import { useContext } from 'react';
import { GameDispatchContext } from './GameContext';

export const useGameDispatch = () => {
  const dispatch = useContext(GameDispatchContext);

  const initializeMatches = (matches) => {
    dispatch({
      type: actionTypes.INITIALIZE_MATCHES,
      matches,
    });
  };

  const resolveMatches = (matches = []) => {
    dispatch({
      type: actionTypes.RESOLVE_MATCHES,
      matches,
    });
  };

  const setResolvedMatches = (resolvedMatches) => {
    dispatch({ type: actionTypes.SET_RESOLVED_MATCHES, resolvedMatches });
  };

  const setCurrentLevel = (level) => {
    dispatch({ type: actionTypes.SET_CURRENT_LEVEL, level });
  };

  const setLevels = (levels = []) => {
    dispatch({ type: actionTypes.SET_LEVELS, levels });
  };

  const setCurrentScore = (score) => {
    dispatch({ type: actionTypes.SET_CURRENT_SCORE, score });
  };

  const setGameMode = (gameMode = {}) => {
    dispatch({ type: actionTypes.SET_GAME_MODE, gameMode });
  };

  const setCardTheme = (cardTheme = {}) => {
    dispatch({ type: actionTypes.SET_CARD_THEME, cardTheme });
  };

  const resetGameContext = () => {
    dispatch({ type: actionTypes.RESET_GAME });
  };

  return {
    initializeMatches,
    resolveMatches,
    resetGameContext,
    setResolvedMatches,
    setCurrentLevel,
    setLevels,
    setCardTheme,
    setCurrentScore,
    setGameMode,
  };
};
