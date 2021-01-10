import React, { useCallback } from 'react';
import { gameModes } from '../GameModes';
import GameConfig from '../GameConfig';
import { useGameState } from '../../context/GameContext';
import { GameModesList } from '../GameModesList/GameModesList';
import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useEffect } from 'react';

const GameController = () => {
  const { isGameConfigured, gameMode } = useGameState();

  const { setIsNavHidden } = useAppLookDispatch();

  useEffect(() => {
    if (!isGameConfigured) {
      if (gameMode) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
    } else {
      setIsNavHidden(true);
    }
    return () => setIsNavHidden(false);
  }, [isGameConfigured, gameMode]);

  const GameComponent = useCallback(() => {
    if (!gameMode) {
      return <GameModesList />;
    }
    if (!isGameConfigured) {
      return <GameConfig />;
    }

    const GameModeComponent = gameModes[gameMode.value]._component;

    return <GameModeComponent gameModeData={gameMode} />;
  }, [isGameConfigured, gameMode]);

  return <GameComponent />;
};

export default GameController;
