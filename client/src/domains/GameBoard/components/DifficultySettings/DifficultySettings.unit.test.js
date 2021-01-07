import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import DifficultySettings from './DifficultySettings';
import * as difficulties from '../../constants/difficulties';

describe('DifficultySettings', () => {
  test('test', () => {
    let selected;
    render(
      <DifficultySettings
        handleChange={(e) => {
          selected = JSON.parse(e.target.value);
        }}
      />
    );

    const inputs = screen.getAllByRole('radio');

    expect(inputs.length).toEqual(Object.keys(difficulties).length);

    userEvent.click(screen.getByText('Easy'));

    expect(selected.value).toEqual('easyDifficulty');
  });
});
