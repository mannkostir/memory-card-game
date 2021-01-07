import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';
import { TimerProvider } from 'domains/GameBoard/context/TimerContext';

jest.useFakeTimers();

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('Timer', () => {
  test("if inactive doesn't increase time value", async () => {
    render(
      <TimerProvider passedState={{ isTimerActive: false }}>
        <Timer />
      </TimerProvider>
    );

    let secondsToPass = 2;

    const timer = screen.getByRole('generic', { name: 'timer' });

    expect(timer.textContent).toBe('0:00');

    expect(setTimeout).toBeCalledTimes(1);

    await waitFor(
      () => {
        expect(secondsToPass--).toBe(0);
      },
      { timeout: 2000, interval: 1000 }
    );

    expect(setTimeout).toBeCalledTimes(1);
  });

  test('if active successfully increases time value', async () => {
    render(
      <TimerProvider passedState={{ isTimerActive: true }}>
        <Timer />
      </TimerProvider>
    );

    let secondsToPass = 2;

    const timer = screen.getByRole('generic', { name: 'timer' });

    expect(timer.textContent).toBe('0:00');

    expect(setTimeout).toBeCalledTimes(1);

    await waitFor(
      () => {
        expect(secondsToPass--).toBe(0);
      },
      { timeout: 2000, interval: 1000 }
    );

    expect(timer.textContent).toBe('0:02');

    expect(setTimeout).toBeCalledTimes(3);
  });

  test('if already passed time is given, then starts with it', async () => {
    render(
      <TimerProvider
        passedState={{
          isTimerActive: true,
          passedTime: { minutes: 5, seconds: 36 },
        }}
      >
        <Timer />
      </TimerProvider>
    );

    expect(screen.getByRole('generic', { name: 'timer' }).textContent).toBe(
      '5:36'
    );
  });
});
