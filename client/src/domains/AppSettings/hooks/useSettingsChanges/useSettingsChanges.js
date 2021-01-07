import { useState } from 'react';
import { useAppLookContext } from 'context/AppLookContext';
import appThemes from 'constants/appThemes';
import { changeKeys } from '../../constants/settingsChangeKeys';
import { useLanguageContext } from 'context/LanguageContext';

export const useSettingsChanges = () => {
  const [changes, setChanges] = useState({});

  const { currentLanguage } = useLanguageContext();

  const {
    cardsThemeRef,
    appTheme,
    setCardsTheme,
    setAppTheme,
  } = useAppLookContext();

  const resetAllChanges = () => {
    setChanges({});
  };

  const resetOneChange = (changeKey = '') => {
    // Clone the "changes" object in order to not mutate the state itself
    let updatedChanges = { ...changes };

    delete updatedChanges[changeKey];

    setChanges(updatedChanges);
  };

  const changeCardsTheme = (newCardsTheme = {}) => {
    if (newCardsTheme.ref === cardsThemeRef) {
      resetOneChange(changeKeys.cardsTheme[currentLanguage]);
    } else {
      setChanges((prevState) => ({
        ...prevState,
        [changeKeys.cardsTheme[currentLanguage]]: {
          ref: newCardsTheme.ref,
          title: newCardsTheme.title,
        },
      }));
    }
  };

  const changeAppTheme = (newAppTheme = {}) => {
    if (newAppTheme.ref === appTheme.ref) {
      resetOneChange(changeKeys.appTheme[currentLanguage]);
    } else {
      setChanges((prevState) => ({
        ...prevState,
        [changeKeys.appTheme[currentLanguage]]: {
          ref: newAppTheme.ref,
          title: newAppTheme.title,
        },
      }));
    }
  };

  const applyChanges = () => {
    const changedAppThemeData = changes[changeKeys.appTheme[currentLanguage]];
    const changedCardsThemeData =
      changes[changeKeys.cardsTheme[currentLanguage]];

    if (changedAppThemeData) {
      setAppTheme(appThemes[changedAppThemeData.ref]);
    }
    if (changedCardsThemeData) {
      setCardsTheme(changedCardsThemeData.ref);
    }
    resetAllChanges();
  };

  return {
    resetAllChanges,
    resetOneChange,
    changeCardsTheme,
    changeAppTheme,
    applyChanges,
    changes,
  };
};
