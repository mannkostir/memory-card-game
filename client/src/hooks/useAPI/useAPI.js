import { useFetch } from '../useFetch';
import { useAuthState } from 'context/AuthContext';
import { useLoading } from '../useLoading';
import { useCallback } from 'react';

export const useAPI = (initialState = { isLoading: false }) => {
  const { username } = useAuthState();

  const { fetchData, error } = useFetch();

  const { isLoading, startLoading, finishLoading } = useLoading(
    initialState.isLoading
  );

  const signUp = useCallback(
    async ({ username = '', password = '' }) => {
      try {
        startLoading();

        const response = await fetchData(`/auth/signup`, {
          method: 'POST',
          body: { username, password },
        });

        return response;
      } catch (e) {
        throw e;
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData]
  );

  const signIn = useCallback(
    async ({ username = '', password = '' }) => {
      try {
        startLoading();

        const response = await fetchData('/auth/signin', {
          method: 'POST',
          body: { username, password },
        });
        return response;
      } catch (e) {
        throw e;
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData]
  );

  const checkAuth = useCallback(async () => {
    try {
      startLoading();

      await fetchData('/auth/check_auth', {
        method: 'POST',
      });
    } catch (e) {
      throw e;
    } finally {
      finishLoading();
    }
  }, [startLoading, finishLoading, fetchData]);

  const logout = useCallback(async () => {
    try {
      startLoading();

      const response = await fetchData('/auth/logout', {
        method: 'POST',
      });

      return response;
    } catch (e) {
      throw e;
    } finally {
      finishLoading();
    }
  }, [startLoading, finishLoading, fetchData]);

  const getHistory = useCallback(
    async (query = '') => {
      try {
        startLoading();

        console.log(query);

        const response = await fetchData(`/users/${username}/history${query}`);

        return response;
      } catch (e) {
        throw e;
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData, username]
  );

  const saveToHistory = useCallback(
    async (
      victory = false,
      data = {
        matchesAmount: 0,
        passedTime: { minutes: 0, seconds: 0 },
        gameMode: '',
        score: 0,
      }
    ) => {
      try {
        startLoading();

        const response = await fetchData(`/users/${username}/history`, {
          method: 'PATCH',
          body: {
            victory,
            ...data,
          },
        });

        return response;
      } catch (e) {
        throw e;
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData, username]
  );

  const clearHistory = useCallback(
    async (gameModes = []) => {
      try {
        startLoading();

        const response = await fetchData(`/users/${username}/history/cleanup`, {
          method: 'POST',
          body: { gameModes },
        });

        return response;
      } catch (e) {
        throw e;
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData, username]
  );

  const getHighscores = useCallback(async () => {
    try {
      startLoading();

      const response = await fetchData(`/users/highscores`);

      return response;
    } catch (e) {
      throw e;
    } finally {
      finishLoading();
    }
  }, [startLoading, finishLoading, fetchData]);

  const updateHighscore = useCallback(
    async (newHighscore) => {
      try {
        startLoading();

        const response = await fetchData(`/users/${username}/highscore`, {
          method: 'PUT',
          body: { score: newHighscore },
        });

        return response;
      } catch (e) {
      } finally {
        finishLoading();
      }
    },
    [startLoading, finishLoading, fetchData, username]
  );

  const deleteUser = useCallback(async () => {
    try {
      startLoading();

      const response = await fetchData(`/users/${username}`, {
        method: 'DELETE',
      });

      return response;
    } catch (e) {
      throw e;
    } finally {
      finishLoading();
    }
  }, [startLoading, finishLoading, fetchData, username]);

  return {
    signUp,
    signIn,
    checkAuth,
    logout,
    getHistory,
    saveToHistory,
    clearHistory,
    getHighscores,
    updateHighscore,
    deleteUser,
    isLoading,
    error,
  };
};
