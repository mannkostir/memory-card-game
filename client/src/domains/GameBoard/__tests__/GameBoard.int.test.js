import React from 'react';
import {
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

describe('GameBoard', () => {
  render(
    <AuthProvider>
      <LanguageProvider>
        <GameBoard />
      </LanguageProvider>
    </AuthProvider>
  );

  test('CardsDeck (game flow)', async () => {
    const gameModesList = screen.queryByRole('list', {
      name: /game-modes-list/i,
    });

    // const target =
    //   gameModesList.children[
    //     Math.floor(0 + Math.random() * gameModesList.children.length)
    //   ];

    const target = gameModesList.children[0];

    const targetInput =
      target.nodeName === 'INPUT' && target.getAttribute('name') === 'gameMode'
        ? target
        : target.querySelector('input[name=gameMode]');

    expect(target).toBeInTheDocument();

    userEvent.click(targetInput);

    expect(gameModesList).not.toBeInTheDocument();

    const gameConfig = screen.queryByRole('generic', {
      name: 'game-configuration',
    });

    expect(gameConfig).toBeInTheDocument();

    const startGameBtn = screen.getByText(/start game/i);

    await waitFor(() => expect(startGameBtn).toBeEnabled());

    userEvent.click(startGameBtn);

    await waitForElementToBeRemoved(gameConfig);

    expect(gameConfig).not.toBeInTheDocument();

    const cardsDeck = await screen.findByRole('generic', {
      name: 'deck-of-cards',
    });

    expect(cardsDeck).toBeInTheDocument();

    const preloader = screen.getByLabelText('preloader');

    expect(preloader).toBeInTheDocument();

    const cards = screen.getAllByLabelText('card');

    const alertMock = jest.fn();

    window.alert = () => alertMock();

    for (let card of cards) {
      userEvent.click(card);
      expect(card.dataset.flipped).toBe('true');
    }

    await waitForElementToBeRemoved(cardsDeck);

    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
