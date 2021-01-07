import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Countdown from './Countdown';
import {
  TimerProvider,
  defaultTimerState,
} from 'domains/GameBoard/context/TimerContext';

describe('Countdown', () => {
  test('test', async () => {
    jest.useFakeTimers();

    render(
      <TimerProvider
        passedState={{ ...defaultTimerState, isTimerActive: true }}
      >
        <Countdown />
      </TimerProvider>
    );

    expect(screen.getByRole('generic', { name: 'countdown' }).textContent).toBe(
      '00:0'
    );

    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});
