import React, { useState, useEffect } from 'react';
import CardsDeck from '../CardsDeck';
import { gameEventTypes, useGameEvents } from '../../context/GameEventsContext';
import { useMount } from 'hooks/useMount';
import { useGame } from '../../hooks/useGame';

export const MemoryGame = () => {
  const [seenCards, setSeenCards] = useState([]);

  const { finishGame } = useGame();

  const { subscribe } = useGameEvents();

  useEffect(() => {
    localStorage.setItem('seenCards', JSON.stringify(seenCards));
    return () => localStorage.removeItem('seenCards');
  }, [seenCards]);

  const checkIfCardsSeen = (currentCards) => {
    const seenCards = JSON.parse(localStorage.getItem('seenCards'));
    if (
      seenCards.some((seenCard) => seenCard.value === currentCards[0].value)
      // currentCards.some((card) =>
      //   seenCards.some((seenCard) => seenCard.id === card.id)
      // )
    ) {
      alert('FAIL');
      finishGame(false);
    } else {
      setSeenCards((seenCards) => [...seenCards, ...currentCards]);
    }
  };

  useMount(() => {
    subscribe(gameEventTypes.matchedUnsuccessfully, (currentCards) =>
      checkIfCardsSeen(currentCards)
    );
  });

  return <CardsDeck />;
};
