import React, { useState } from 'react';
import ModalDialog from 'components/ModalDialog';
import { useGameContext, useGameState } from '../../context/GameContext';
import { CustomGame } from './CustomGame';
import { useLanguageContext } from 'context/LanguageContext';
import { MemoryGame } from './MemoryGame';
import { FocusGame } from './FocusGame';
import { useMemo } from 'react';
import { useMount } from 'hooks/useMount';
import { challengeGameLevels, testLevels } from '../../constants/gameLevels';
import { gameEventTypes, useGameEvents } from '../../context/GameEventsContext';

export const ChallengeGame = ({ gameModeData }) => {
  const [isDescriptionShown, setIsDescriptionShown] = useState(false);

  const { currentLevel, levelsAmount, setLevels } = useGameContext();

  const { subscribe } = useGameEvents();

  const { currentLanguage } = useLanguageContext();

  const [GameComponent, setGameComponent] = useState();

  useMount(() => {
    assignGameComponent();

    subscribe(gameEventTypes.levelFinished, (data) => {
      assignGameComponent();
    });
  });

  const assignGameComponent = () => {
    if (currentLevel <= levelsAmount / 3) {
      setGameComponent(<CustomGame />);
    } else if (currentLevel <= (levelsAmount / 3) * 2) {
      setGameComponent(<FocusGame />);
    } else {
      setGameComponent(<MemoryGame />);
    }
  };

  // const GamePhase = useMemo(() => {
  //   if (currentLevel <= levelsAmount / 3) {
  //     return <CustomGame />;
  //   } else if (currentLevel <= (levelsAmount / 3) * 2) {
  //     return <FocusGame />;
  //   } else {
  //     return <MemoryGame />;
  //   }
  // }, [currentLevel]);

  return <>{GameComponent}</>;
};
