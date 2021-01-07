import { useState, useCallback } from 'react';

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setIsLoading(true);

    try {
      if (options.body) options.body = JSON.stringify(options.body);
      if (!options.headers) options.headers = {};
      if (!options.body) options.body = null;
      options.headers['Content-Type'] = 'application/json';

      const response = await fetch(url, options);

      const data = response.status !== 204 ? await response.json() : response;

      if (!response.ok)
        throw new Error(
          data.message || 'Something went wrong, try again later'
        );

      return data;
    } catch (error) {
      setMessage(error.message);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { message, error, isLoading, fetchData };
};
