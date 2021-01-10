import React from 'react';
import { useLanguageContext } from 'context/LanguageContext';
import {
  LanguageSelectButton,
  LanguageSelectWrapper,
} from './LanguageSelect.styles';

const LanguageSelect = ({ ...args }) => {
  const { setCurrentLanguage, currentLanguage } = useLanguageContext();

  return (
    <LanguageSelectWrapper {...args}>
      <LanguageSelectButton
        value="EN"
        aria-selected={currentLanguage === 'EN'}
        onClick={() => setCurrentLanguage('EN')}
      >
        EN
      </LanguageSelectButton>
      <LanguageSelectButton
        value="RU"
        aria-selected={currentLanguage === 'RU'}
        onClick={() => setCurrentLanguage('RU')}
      >
        RU
      </LanguageSelectButton>
    </LanguageSelectWrapper>
  );
};

export default LanguageSelect;
