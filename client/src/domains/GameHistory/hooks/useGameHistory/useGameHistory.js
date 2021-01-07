import { useAPI } from 'hooks/useAPI';
import { useState, useCallback } from 'react';

export const useGameHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [recordsAmount, setRecordsAmount] = useState(0);

  const { getHistory } = useAPI();

  const fetchHistory = useCallback(
    async (query = '') => {
      try {
        const data = await getHistory(query);

        setGameHistory(data.history);
        setRecordsAmount(data.recordsAmount);
      } catch (e) {
        throw e;
      }
    },
    [setGameHistory, setRecordsAmount, getHistory]
  );

  return { gameHistory, recordsAmount, fetchHistory };
};
