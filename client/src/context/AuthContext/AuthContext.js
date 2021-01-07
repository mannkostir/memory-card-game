import { authActionTypes } from 'actions/authActions';
import { localStorageKeys } from 'constants/localStorageKeys';
import { useLoadingContext } from 'context/LoadingContext';
import { useFetch } from 'hooks/useFetch';
import { useMount } from 'hooks/useMount';
import React, { createContext, useReducer } from 'react';
import { authReducer } from 'reducers/authReducer';

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();

const rememberedUserData = JSON.parse(
  localStorage.getItem(localStorageKeys.authState)
);

export const defaultAuthState = rememberedUserData || {
  userId: null,
  username: null,
};

export const AuthProvider = ({ children, passedState }) => {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);

  const { fetchData } = useFetch();

  const { setLoaderVisibility } = useLoadingContext('Auth');

  useMount(() => {
    (async () => {
      // Check if the user has token(s)
      try {
        setLoaderVisibility(true);

        const data = await fetchData('/auth/check_auth', {
          method: 'POST',
        });

        const { userId, username } = data;

        // Tokens validity confirmed, authenticate the user

        dispatch({ type: authActionTypes.LOGIN, userId, username });
      } catch (e) {
        // Proceed without throwing (the user remains unauthenticated)

        return;
      } finally {
        setLoaderVisibility(false);
      }
    })();
  });

  return (
    <AuthStateContext.Provider value={{ ...passedState, ...state }}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
