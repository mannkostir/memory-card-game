import { useAuthState } from './useAuthState';
import { useAuthDispatch } from './useAuthDispatch';

export const useAuthContext = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  return { ...state, ...dispatch };
};
