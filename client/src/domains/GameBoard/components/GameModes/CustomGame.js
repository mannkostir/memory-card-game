import React from 'react';
import CardsDeck from '../CardsDeck';
import { useGameEvents, gameEventTypes } from '../../context/GameEventsContext';
import { useMount } from 'hooks/useMount';
import ModalDialog from 'components/ModalDialog';
import { useState } from 'react';

export const CustomGame = () => {
  const { subscribe } = useGameEvents();

  const [isGameFinished, setIsGameFinished] = useState(false);

  useMount(() => {
    subscribe(gameEventTypes.gameFinished, (_gameData) => {
      setIsGameFinished(true);
    });
  });

  return (
    <>
      <CardsDeck />
    </>
  );
};
