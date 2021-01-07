import { appLookActionTypes } from 'actions/appLookActions';
import { useContext } from 'react';
import { AppLookDispatchContext } from './AppLookContext';

export const useAppLookDispatch = () => {
  const dispatch = useContext(AppLookDispatchContext);

  const setCardsTheme = (cardsThemeRef = '') => {
    dispatch({ type: appLookActionTypes.SET_CARDS_THEME, cardsThemeRef });
  };

  const setAppTheme = (appTheme = {}) => {
    dispatch({ type: appLookActionTypes.SET_APP_THEME, appTheme });
  };

  const setIsOverlay = (isOverlay = false) => {
    dispatch({ type: appLookActionTypes.SET_IS_OVERLAY, isOverlay });
  };

  return { setCardsTheme, setAppTheme, setIsOverlay };
};
