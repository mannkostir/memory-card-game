import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ModalDialog from './ModalDialog';

describe('ModalDialog', () => {
  test('opens/closes as intended', () => {
    const children = 'Modal dialog test';

    let isOpen = false;

    let closeModal = () => (isOpen = false);
    let openModal = () => (isOpen = true);

    const Component = () => (
      <>
        <button data-testid="open-modal" onClick={openModal}>
          Open modal
        </button>
        <ModalDialog isOpen={isOpen}>
          <ModalDialog.Overlay data-testid="overlay" onClick={closeModal} />
          <button data-testid="close-modal" onClick={closeModal}>
            Close modal
          </button>
          <span>{children}</span>
        </ModalDialog>
      </>
    );

    const { queryByText, getByTestId, rerender } = render(<Component />);

    // Mimic useState hook
    const rerenderComponent = () => {
      rerender(<Component />);
    };

    expect(queryByText(children)).not.toBeInTheDocument();

    userEvent.click(getByTestId('open-modal'));
    rerenderComponent();

    expect(queryByText(children)).toBeInTheDocument();

    userEvent.click(getByTestId('close-modal'));
    rerenderComponent();

    expect(queryByText(children)).not.toBeInTheDocument();

    userEvent.click(getByTestId('open-modal'));
    rerenderComponent();

    expect(queryByText(children)).toBeInTheDocument();

    userEvent.click(getByTestId('overlay'));
    rerenderComponent();

    expect(queryByText(children)).not.toBeInTheDocument();
  });
});
