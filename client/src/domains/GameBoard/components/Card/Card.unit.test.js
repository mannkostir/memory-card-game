import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

describe('Card', () => {
  test('responses on onClick unless been clicked (flipped) or disabled', () => {
    const onClick = jest.fn();

    render(
      <Card
        disabled={true}
        flipped={false}
        onClick={onClick}
        data-testid="card"
      />
    );

    const card = getByTestId('card');

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(card.dataset.flipped).toEqual('false');
    expect(card.dataset.disabled).toEqual('true');

    userEvent.click(card);

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(card.dataset.flipped).toEqual('false');

    // Enable card
    screen.rerender(
      <Card
        disabled={false}
        flipped={false}
        onClick={onClick}
        data-testid="card"
      />
    );

    userEvent.click(card);

    // Card flip on click
    screen.rerender(
      <Card
        disabled={disabled}
        flipped={!flipped}
        onClick={onClick}
        data-testid="card"
      />
    );

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(card.dataset.flipped).toEqual('true');
    expect(card.dataset.disabled).toEqual('false');

    userEvent.click(card);

    // Flipped card has no onClick, hence it must
    // have been called only once
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(card.dataset.flipped).toEqual('true');
  });
});
