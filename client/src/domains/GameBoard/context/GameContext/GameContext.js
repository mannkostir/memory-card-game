import React, { createContext, useReducer } from 'react';
import { useMount } from 'hooks/useMount';
import { gameActionTypes } from '../../actions/gameActions';
import { gameReducer } from '../../reducers/gameReducer';
import { localStorageKeys } from '../../constants/localStorageKeys';
import { defaultGameLevels } from '../../constants/gameLevels';

export const GameStateContext = createContext();
export const GameDispatchContext = createContext();

export const defaultGameState = {
  gameMode: null,
  currentScore: 0,
  matchesAmount: 1,
  currentMatches: [],
  resolvedMatches: [],
  levels: defaultGameLevels,
  currentLevel: 0,
  modifier: '',
};

export const GameProvider = ({ providedState, children }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState);

  useMount(() => {
    const gameStateStorage = JSON.parse(
      localStorage.getItem(localStorageKeys.gameState)
    );

    if (gameStateStorage) {
      dispatch({
        type: gameActionTypes.UPDATE_GAME_STATE,
        gameState: { ...state, ...gameStateStorage },
      });
    }
  });

  return (
    <GameStateContext.Provider value={{ ...state, ...providedState }}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};
