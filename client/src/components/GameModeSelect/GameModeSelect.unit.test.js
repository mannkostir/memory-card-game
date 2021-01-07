import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import GameModeSelect from './GameModeSelect';

describe('GameModeSelect', () => {
  test('generates list of game modes', () => {
    let selectedMode = null;

    const { queryAllByRole } = render(
      <GameModeSelect
        handleModeSelection={(gameMode) => (selectedMode = gameMode)}
      >
        <GameModeSelect.GameModesList />
      </GameModeSelect>
    );

    const gameModes = queryAllByRole('radio', { name: /game-mode/i });

    expect(Array.isArray(gameModes)).toBe(true);

    expect(selectedMode).toBeNull();

    const gameModeTest = {
      value: 'testTemplate',
      title: 'Test',
      withLevels: false,
      withDifficulty: false,
      ranked: false,
      description: 'Game mode template for test',
    };

    userEvent.click(gameModes[0]);

    expect(Object.keys(selectedMode)).toEqual(Object.keys(gameModeTest));
  });
});
