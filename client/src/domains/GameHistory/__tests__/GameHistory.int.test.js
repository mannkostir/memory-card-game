import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import GameHistory from '../GameHistory';
import { AuthProvider } from 'context/AuthContext';

describe('GameHistory', () => {
  test('test', () => {
    let i = 1;

    const gameHistory = new Array(5).fill({ matchesAmount: i++ });

    render(
      <AuthProvider>
        <GameHistory gameHistory={gameHistory} />
      </AuthProvider>
    );

    screen.debug();
  });
});
