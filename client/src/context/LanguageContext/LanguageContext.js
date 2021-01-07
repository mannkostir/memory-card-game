import React, { createContext, useReducer } from 'react';
import { languageReducer } from 'reducers/languageReducer';
import { useMount } from 'hooks/useMount';
import { languageActionTypes } from 'actions/languageActions';
import { localStorageKeys } from 'constants/localStorageKeys';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, {
    currentLanguage: 'RU',
  });

  useMount(() => {
    const languageStateStorage = JSON.parse(
      localStorage.getItem(localStorageKeys.languageState)
    );

    if (languageStateStorage) {
      const { currentLanguage } = languageStateStorage;

      dispatch({
        type: languageActionTypes.SET_CURRENT_LANGUAGE,
        currentLanguage,
      });
    }
  });

  return (
    <LanguageContext.Provider value={[state, dispatch]}>
      {children}
    </LanguageContext.Provider>
  );
};
