import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { useInterval } from './useInterval';

const UseIntervalExample = () => {
  const [secondsCount, setSecondsCount] = useState(0);

  useInterval(() => {
    setSecondsCount((seconds) => seconds + 1);
  }, 1000);

  return (
    <div>
      <span>Seconds passed: {secondsCount}</span>
    </div>
  );
};

jest.useFakeTimers();

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('useInterval', () => {
  test('test', async () => {
    render(<UseIntervalExample />);

    const secondsCounter = screen.getByText(/Seconds passed: /);

    expect(secondsCounter).toHaveTextContent('Seconds passed: 0');

    expect(setTimeout).toHaveBeenCalledTimes(1);

    await waitFor(
      () => {
        expect(secondsCounter).toHaveTextContent('Seconds passed: 2');
      },
      { interval: 1000 }
    );

    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});
