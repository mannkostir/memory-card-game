import { useContext } from 'react';
import { languageActionTypes } from 'actions/languageActions';
import { LanguageContext } from './LanguageContext';

export const useLanguageContext = () => {
  const [state, dispatch] = useContext(LanguageContext);

  const { currentLanguage } = state;

  const setCurrentLanguage = (currentLanguage = '') => {
    dispatch({
      type: languageActionTypes.SET_CURRENT_LANGUAGE,
      currentLanguage,
    });
  };

  return { currentLanguage, setCurrentLanguage };
};
