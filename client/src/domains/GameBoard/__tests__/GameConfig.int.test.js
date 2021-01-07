import React from 'react';
import {
  findByRole,
  findByText,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import GameBoard from '../GameBoard';
import { AuthProvider } from 'context/AuthContext';
import { LanguageProvider } from 'context/LanguageContext';

describe('GameConfig', () => {
  render(
    <AuthProvider>
      <LanguageProvider>
        <GameBoard />
      </LanguageProvider>
    </AuthProvider>
  );

  test('selects game mode', async () => {
    const gameModesList = await screen.findByRole('list', {
      name: /game-modes-list/i,
    });

    for (let gameMode of gameModesList.children) {
      expect(
        screen.queryByRole('list', {
          name: /game-modes-list/i,
        })
      ).toBeInTheDocument();

      const targetInput =
        gameMode.nodeName === 'INPUT' &&
        gameMode.getAttribute('name') === 'gameMode'
          ? gameMode
          : gameMode.querySelector('input[name=gameMode]');

      const gameModeValue = JSON.parse(targetInput.value);

      userEvent.click(targetInput);

      const startGameBtn = await screen.findByText(/start game/i);

      userEvent.click(startGameBtn);

      expect((await screen.findByText(/game$/)).textContent).toBe(
        `${gameModeValue.title} game`
      );

      const resetGameBtn = await screen.findByRole('button', {
        name: /reset game/i,
      });

      userEvent.click(resetGameBtn);

      await screen.findByRole('list', {
        name: /game-modes-list/i,
      });
    }

    test('selects game difficulty', () => {
      const gameModesList = await screen.findByRole('list', {
        name: /game-modes-list/i,
      });

      for (let gameMode of gameModesList.children) {
        const targetInput =
          gameMode.nodeName === 'INPUT' &&
          gameMode.getAttribute('name') === 'gameMode'
            ? gameMode
            : gameMode.querySelector('input[name=gameMode]');
  
        const gameModeValue = JSON.parse(targetInput.value);

        if (!gameModeValue.withDifficulty) continue;
  
        userEvent.click(targetInput);
  
        const startGameBtn = await screen.findByText(/start game/i);
  
        userEvent.click(startGameBtn);
  
        const gameConfig = await screen.findByRole('generic', {
          name: 'game-configuration',
        });
  
        expect((await screen.findByText(/game$/)).textContent).toBe(
          `${gameModeValue.title} game`
        );
  
        const resetGameBtn = await screen.findByRole('button', {
          name: /reset game/i,
        });
  
        userEvent.click(resetGameBtn);
  
        await screen.findByRole('list', {
          name: /game-modes-list/i,
        });
      }
    })
  });
});
