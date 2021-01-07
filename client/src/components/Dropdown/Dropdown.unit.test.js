import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  test('content expands/collapses on click', () => {
    const content = 'Test content';

    const { getByRole, queryByText } = render(
      <Dropdown>
        <Dropdown.ToggleTrigger></Dropdown.ToggleTrigger>
        <Dropdown.Content>{content}</Dropdown.Content>
      </Dropdown>
    );

    expect(queryByText(content)).not.toBeInTheDocument();

    userEvent.click(getByRole('button', { name: /expand/i }));

    expect(queryByText(content)).toBeInTheDocument();

    userEvent.click(getByRole('button', { name: /collapse/i }));

    expect(queryByText(content)).not.toBeInTheDocument();
  });
});
