import { useAppLookDispatch } from './useAppLookDispatch';
import { useAppLookState } from './useAppLookState';

export const useAppLookContext = () => {
  const state = useAppLookState();
  const dispatch = useAppLookDispatch();

  return { ...state, ...dispatch };
};
