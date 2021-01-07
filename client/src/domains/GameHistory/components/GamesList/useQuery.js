import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useQuery = () => {
  const [query, setQuery] = useState({});
  const [formattedQuery, setFormattedQuery] = useState('');

  const history = useHistory() || [];

  const changeQuery = useCallback(
    (query = {}) => {
      setQuery(query);
    },
    [setQuery]
  );

  const _updateQuery = useCallback(() => {
    const searchQuery = Object.entries(query).reduce(
      (acc, query, index, arr) => {
        if (query[0] && query[1]) {
          if (!acc) {
            acc += `?${query[0]}=${query[1]}`;
          } else if (index < arr.length) {
            acc += `&${query[0]}=${query[1]}`;
          }
        }
        return acc;
      },
      ''
    );

    history.push({
      search: searchQuery,
    });

    // console.log(searchQuery);

    setFormattedQuery(searchQuery);
  }, [query, history]);

  useEffect(() => {
    _updateQuery();
  }, [query, _updateQuery]);

  // const updateQueryOld = useCallback(() => {
  //   const searchQuery = query.reduce((acc, query, index, arr) => {
  //     if (query) {
  //       if (!acc) {
  //         acc += `?${query}`;
  //       } else if (index < arr.length) {
  //         acc += `&${query}`;
  //       }
  //     }
  //     return acc;
  //   }, '');

  //   history.push({
  //     search: searchQuery,
  //   });
  // }, [query, history]);

  return { query, formattedQuery, changeQuery };
};
