import { appLookActionTypes } from 'actions/appLookActions';
import { localStorageKeys } from 'constants/localStorageKeys';
import { updateState } from 'utils/updateState';

export const appLookReducer = (state, action) => {
  switch (action.type) {
    case appLookActionTypes.SET_APP_THEME:
      return updateState(
        state,
        { appTheme: action.appTheme },
        localStorageKeys.appLook
      );
    case appLookActionTypes.SET_CARDS_THEME:
      return updateState(
        state,
        { cardsThemeRef: action.cardsThemeRef },
        localStorageKeys.appLook
      );
    case appLookActionTypes.SET_IS_OVERLAY:
      document.body.setAttribute('isOverlay', action.isOverlay);
      return updateState(
        state,
        { isOverlay: action.isOverlay },
        localStorageKeys.appLook
      );
    default:
      return { ...state };
  }
};
