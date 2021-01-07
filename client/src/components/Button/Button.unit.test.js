import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

// const tests = new TestPresets(Button);

// describe('Button', () => {
//   // Presets
//   tests.renderWithoutChildren();
//   tests.renderWithChildren();
//   tests.passProps();

//   // Custom test
//   tests.testComponent(() => {
//     test('test', () => {
//       expect(true).toBe(true);
//     });
//   });
// });

describe('Button', () => {
  test('accepts arguments', () => {
    let clicked = false;

    const { getByTestId } = render(
      <Button
        onClick={() => (clicked = true)}
        value="test"
        data-testid="generic-button"
      />
    );

    const button = getByTestId('generic-button');

    expect(button).toHaveAttribute('value', 'test');

    expect(clicked).toBe(false);

    userEvent.click(button);

    expect(clicked).toBe(true);
  });

  test('renders children', () => {
    const children = 'Test children';

    const { getByText } = render(<Button>{children}</Button>);

    expect(getByText(children)).toBeInTheDocument();
  });
});
