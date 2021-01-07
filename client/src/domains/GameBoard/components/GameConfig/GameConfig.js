import React, { useState } from 'react';
import { useMount } from 'hooks/useMount';
import { useForm } from 'hooks/useForm';
import DifficultySettings from '../DifficultySettings';
import { useGameContext } from '../../context/GameContext';
import Button from 'components/Button';
import { ButtonsWrapper } from './GameConfig.styles';
import CenteredContainer from 'components/CenteredContainer/CenteredContainer';
import { useGame } from '../../hooks/useGame';
import { EASY_DIFFICULTY } from '../../constants/difficulties';
import { gameModifiers } from 'constants/gameModes';
import { useLanguageContext } from 'context/LanguageContext';
import { text } from './GameConfig.text';
import FlexContainer from 'components/FlexContainer';

const GameConfig = () => {
  const {
    gameMode,
    currentLevel,
    levels,
    setCurrentLevel,
    resetGameContext,
    setLevels,
  } = useGameContext();

  const { currentLanguage } = useLanguageContext();

  const { initGame } = useGame();

  const [values, handleChange] = useForm();

  const [difficulty, setDifficulty] = useState({ modifier: '' });

  useMount(() => {
    // If game mode presupposes levels and current level is not initialized, then initialize

    // Violating open/closed principle here (!)

    if (gameMode.modifier === gameModifiers.levels && !currentLevel) {
      initStartingLevel();
    } else if (
      gameMode.modifier === gameModifiers.difficulty &&
      !difficulty.modifier
    ) {
      setDifficulty(EASY_DIFFICULTY);
    } else if (+gameMode.modifier > 0) {
      setDifficulty({ modifier: +gameMode.modifier });
    }
  });

  const initStartingLevel = (initialLevel = 1) => {
    setLevels(gameMode.levels || []);
    setCurrentLevel(initialLevel);
  };

  const handleConfig = async () => {
    try {
      initGame({
        nextMatchesAmount: levels[currentLevel].matchesAmount,
        difficulty: values?.difficulty
          ? JSON.parse(values.difficulty)
          : difficulty,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <FlexContainer aria-label="game-configuration">
      <h1>{gameMode.title[currentLanguage]}</h1>
      {gameMode.modifier === gameModifiers.difficulty && difficulty.modifier ? (
        <DifficultySettings
          difficultyValue={difficulty.value}
          handleChange={handleChange}
        />
      ) : null}
      <ButtonsWrapper style={{ width: '20em', justifyContent: 'space-around' }}>
        <Button onClick={resetGameContext}>
          {text.cancelBtn[currentLanguage]}
        </Button>
        <Button onClick={handleConfig}>{text.startBtn[currentLanguage]}</Button>
      </ButtonsWrapper>
    </FlexContainer>
  );
};

export default GameConfig;
