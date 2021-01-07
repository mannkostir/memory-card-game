import React from 'react';
import GameController from './components/GameController';
import { GameProvider } from './context/GameContext/GameContext';
import { TimerProvider } from './context/TimerContext/TimerContext';
import { GameEventsProvider } from './context/GameEventsContext/GameEventsContext';

const GameBoard = () => {
  return (
    <GameProvider>
      <TimerProvider>
        <GameEventsProvider>
          <section>
            <GameController />
          </section>
        </GameEventsProvider>
      </TimerProvider>
    </GameProvider>
  );
};

export default GameBoard;
