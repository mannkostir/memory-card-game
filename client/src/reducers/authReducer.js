import { authActionTypes } from '../actions/authActions';
import { defaultAuthState } from '../context/AuthContext/AuthContext';
import { updateState } from 'utils/updateState';
import { localStorageKeys } from 'constants/localStorageKeys';

export const authReducer = (state, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return updateState(
        state,
        {
          userId: action.userId,
          username: action.username,
        },
        localStorageKeys.authState
      );
    case authActionTypes.LOGOUT:
      localStorage.removeItem(localStorageKeys.authState);
      return { defaultAuthState };
    default:
      return { ...state };
  }
};
