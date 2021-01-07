import React from 'react';
import {
  CloseDialogButton,
  CloseDialogIcon,
  StyledDialog,
} from './ModalDialog.styles';

const ModalDialog = ({
  isOpen = false,
  onClose = (e = new Event()) => {},
  children,
  ...args
}) => {
  return isOpen ? (
    <StyledDialog {...args}>
      <CloseDialogButton onClick={onClose}>
        <CloseDialogIcon className="fas fa-times" />
      </CloseDialogButton>
      {children}
    </StyledDialog>
  ) : null;
};

export default ModalDialog;
