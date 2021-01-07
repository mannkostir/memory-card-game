import { useContext } from 'react';
import { AppLookStateContext } from './AppLookContext';

export const useAppLookState = () => {
  const { cardsThemeRef, appTheme, isOverlay } = useContext(
    AppLookStateContext
  );

  return { cardsThemeRef, appTheme, isOverlay };
};
