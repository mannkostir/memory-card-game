import Button from 'components/Button';
import ModalDialog from 'components/ModalDialog';
import { useLanguageContext } from 'context/LanguageContext';
import React from 'react';
import { WarningText } from './SecurityWarning.styles';
import * as text from './SecurityWarning.text';

export const SecurityWarning = ({ isOpen = false, onClose = () => {} }) => {
  const { currentLanguage } = useLanguageContext();

  return (
    <ModalDialog isOpen={isOpen} onClose={onClose}>
      <WarningText>{text.warningText[currentLanguage]}</WarningText>
      <Button onClick={onClose}>{text.acceptButton[currentLanguage]}</Button>
    </ModalDialog>
  );
};
