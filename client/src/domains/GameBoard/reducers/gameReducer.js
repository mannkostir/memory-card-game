import { defaultGameState as defaultState } from '../context/GameContext';
import { gameActionTypes } from '../actions/gameActions';
import { updateState } from 'utils/updateState';
import { localStorageKeys } from '../constants/localStorageKeys';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case gameActionTypes.UPDATE_GAME_STATE:
      return updateState(state, action.gameState, localStorageKeys.gameState);

    case gameActionTypes.SET_GAME_MODE:
      return updateState(
        state,
        { gameMode: action.gameMode },
        localStorageKeys.gameState
      );

    case gameActionTypes.SET_CURRENT_LEVEL:
      return updateState(
        state,
        { currentLevel: action.level },
        localStorageKeys.gameState
      );

    case gameActionTypes.SET_LEVELS:
      return updateState(
        state,
        { levels: action.levels },
        localStorageKeys.gameState
      );

    case gameActionTypes.INITIALIZE_MATCHES:
      return updateState(
        state,
        {
          currentMatches: action.matches,
          matchesAmount: action.matches.length,
        },
        localStorageKeys.gameState
      );

    case gameActionTypes.RESOLVE_MATCHES:
      return updateState(
        state,
        {
          resolvedMatches: [...state.resolvedMatches, ...action.matches],
        },
        localStorageKeys.gameState
      );

    case gameActionTypes.SET_RESOLVED_MATCHES:
      return updateState(
        state,
        { resolvedMatches: action.resolvedMatches },
        localStorageKeys.gameState
      );

    case gameActionTypes.SET_CURRENT_SCORE:
      return updateState(
        state,
        { currentScore: action.score },
        localStorageKeys.gameState
      );

    case gameActionTypes.ADD_TO_SCORE:
      return updateState(
        state,
        {
          currentScore: state.currentScore + action.additionAmount,
        },
        localStorageKeys.gameState
      );

    case gameActionTypes.SET_CARD_THEME:
      return updateState(
        state,
        { cardTheme: action.cardTheme },
        localStorageKeys.gameState
      );

    case gameActionTypes.SUBTRACT_FROM_SCORE:
      return updateState(
        state,
        {
          currentScore: state.currentScore - action.subtractionAmount,
        },
        localStorageKeys.gameState
      );

    case gameActionTypes.RESET_GAME:
      localStorage.removeItem(localStorageKeys.gameState);
      return defaultState;

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
