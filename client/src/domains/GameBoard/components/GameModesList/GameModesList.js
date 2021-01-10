import React from 'react';
import GameModeSelect from 'components/GameModeSelect';
import RadioButton from 'components/RadioButton';
import { StyledGameModeSelect } from '../GameController/GameController.styles';
import { useLanguageContext } from 'context/LanguageContext';
import { useGameDispatch } from 'domains/GameBoard/context/GameContext';
import { useLoading } from 'hooks/useLoading';
import { useCallback } from 'react';

export const GameModesList = () => {
  const { currentLanguage } = useLanguageContext();

  const { setGameMode } = useGameDispatch();

  const { isLoading, startLoading, finishLoading } = useLoading();

  const selectGameMode = (event) => {
    startLoading();

    const gameMode = JSON.parse(event.target.value);

    setGameMode(gameMode);

    finishLoading();
  };

  return (
    <StyledGameModeSelect>
      <GameModeSelect.GameModesList style={{ marginTop: '-4.5em' }}>
        {(data, index) => (
          <RadioButton
            key={index}
            name="gameMode"
            id={data.value}
            value={JSON.stringify(data)}
            onChange={selectGameMode}
            disabled={isLoading}
          >
            <h3>{data.title[currentLanguage]}</h3>
            <p>{data.description[currentLanguage]}</p>
          </RadioButton>
        )}
      </GameModeSelect.GameModesList>
    </StyledGameModeSelect>
  );
};
