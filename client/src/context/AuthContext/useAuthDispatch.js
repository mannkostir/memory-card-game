import { useContext } from 'react';
import { AuthDispatchContext } from './AuthContext';
import { authActionTypes } from '../../actions/authActions';
import { useAPI } from 'hooks/useAPI';

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);

  const api = useAPI();

  const login = ({ userId = '', username = '' }) => {
    dispatch({
      type: authActionTypes.LOGIN,
      userId,
      username,
    });
  };

  const logout = async () => {
    await api.logout();
    dispatch({ type: authActionTypes.LOGOUT });
  };

  return { login, logout };
};
