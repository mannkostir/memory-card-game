import { useContext, useMemo } from 'react';
import { AuthStateContext } from './AuthContext';

export const useAuthState = () => {
  const { userId, username } = useContext(AuthStateContext);

  const isAuthenticated = useMemo(() => !!userId, [userId]);

  return { isAuthenticated, username, userId };
};
