import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import GamesList from './GamesList';
import { AuthProvider } from 'context/AuthContext';
import { customMode } from 'constants/gameModes';

describe('GamesList', () => {
  test('without passed gameHistory renders nothing', () => {
    render(
      <AuthProvider>
        <GamesList />
      </AuthProvider>
    );

    expect(
      screen.getByRole('list', { name: 'games-list' })
    ).toBeEmptyDOMElement();
  });

  test('renders content if gameHistory passed', () => {
    render(
      <AuthProvider>
        <GamesList gameHistory={new Array(4).fill({ matchesAmount: 4 })} />
      </AuthProvider>
    );

    expect(
      screen.getByRole('list', { name: 'games-list' })
    ).not.toBeEmptyDOMElement();

    screen.debug();
  });
});
