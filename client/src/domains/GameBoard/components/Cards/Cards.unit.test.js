import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Cards from './Cards';

describe('Cards', () => {
  test('renders pairs of cards', () => {
    const testMatches = new Array(12)
      .fill({})
      .map((card, index) => ({ ...card, id: index }));

    const { queryAllByLabelText } = render(
      <Cards currentMatches={testMatches} />
    );

    const cards = queryAllByLabelText('card');

    expect(cards).toHaveLength(testMatches.length);
  });
});
