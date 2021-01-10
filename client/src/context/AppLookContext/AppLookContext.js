import appThemes from 'constants/appThemes';
import cardsThemes from 'constants/cardsThemes';
import { localStorageKeys } from 'constants/localStorageKeys';
import React, { createContext } from 'react';
import { useReducer } from 'react';
import { appLookReducer } from 'reducers/appLookReducer';
import { ThemeProvider } from 'styled-components';

export const AppLookStateContext = createContext();
export const AppLookDispatchContext = createContext();

const appLookDataStorage = JSON.parse(
  localStorage.getItem(localStorageKeys.appLook)
);

export const defaultAppLookState = appLookDataStorage || {
  appTheme: appThemes.testTheme || {},
  cardsThemeRef: cardsThemes.dogs.ref || '',
  isOverlay: false,
  isNavHidden: false,
};

export const AppLookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appLookReducer, defaultAppLookState);

  const { appTheme, ...appLook } = state;

  return (
    <AppLookStateContext.Provider value={{ ...appLook, appTheme }}>
      <AppLookDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
      </AppLookDispatchContext.Provider>
    </AppLookStateContext.Provider>
  );
};
