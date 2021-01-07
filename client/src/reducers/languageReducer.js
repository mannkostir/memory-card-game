import { languageActionTypes } from '../actions/languageActions';
import { updateState } from 'utils/updateState';
import { localStorageKeys } from 'constants/localStorageKeys';

export const languageReducer = (state, action) => {
  switch (action.type) {
    case languageActionTypes.SET_CURRENT_LANGUAGE:
      return updateState(
        state,
        { currentLanguage: action.currentLanguage },
        localStorageKeys.languageState
      );
    default:
      return { ...state };
  }
};
