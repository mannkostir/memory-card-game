import React, { useCallback } from 'react';
import { gameModes } from '../GameModes';
import GameConfig from '../GameConfig';
import { useGameState } from '../../context/GameContext';
import { GameModesList } from '../GameModesList/GameModesList';

const GameController = () => {
  const { isGameConfigured, gameMode } = useGameState();

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
