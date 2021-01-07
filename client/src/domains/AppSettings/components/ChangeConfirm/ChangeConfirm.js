import { useLanguageContext } from 'context/LanguageContext';
import React from 'react';
import {
  ButtonsWrapper,
  ChangeConfirmWrapper,
  ConfirmChangesButton,
  DiscardChangesButton,
  RemoveEntryIcon,
} from './ChangeConfirm.styles';
import { text } from './ChangeConfirm.text';

export const ChangeConfirm = ({
  changesObj = {},
  resetAllChanges = () => {},
  resetOneChange = (changeKey = '') => {},
  applyChanges = () => {},
  ...args
}) => {
  const { currentLanguage } = useLanguageContext();

  return (
    <ChangeConfirmWrapper {...args}>
      <ul>
        {Object.entries(changesObj).map(([changeKey, changeValue], i) => (
          <li key={i}>
            <RemoveEntryIcon
              className="fas fa-times"
              onClick={() => resetOneChange(changeKey)}
            />
            <i>{changeKey}</i> {text.themeChange[currentLanguage]}{' '}
            <i>{changeValue.title}</i>
          </li>
        ))}
      </ul>
      <ButtonsWrapper>
        <ConfirmChangesButton onClick={applyChanges}>
          {text.changeControl.confirm[currentLanguage]}
          <i className="fas fa-check"></i>
        </ConfirmChangesButton>
        <DiscardChangesButton onClick={resetAllChanges}>
          {text.changeControl.discard[currentLanguage]}
          <i className="fas fa-times"></i>
        </DiscardChangesButton>
      </ButtonsWrapper>
    </ChangeConfirmWrapper>
  );
};
