import React, { useCallback, useContext, useState, createContext } from 'react';
import { gameModesInfo } from 'constants/gameModes';
import FlexContainer from 'components/FlexContainer';
import RadioButton from 'components/RadioButton';
import { SelectList } from './GameModeSelect.styles';

const GameModeSelectContext = createContext();

const GameModeSelect = ({
  isLoading,
  handleModeSelection,
  defaultMode,
  className,
  children,
  currentLanguage,
  ...args
}) => {
  const [gameMode, setGameMode] = useState(defaultMode);

  const selectGameMode = (event) => {
    const gameModeObj = JSON.parse(event.target.value);
    setGameMode(gameModeObj);
    handleModeSelection(gameModeObj);
  };

  return (
    <GameModeSelectContext.Provider
      value={{
        selectGameMode,
        isLoading,
        defaultMode,
        gameMode,
        currentLanguage,
      }}
    >
      <FlexContainer className={`game-mode-select ${className}`} {...args}>
        {children}
      </FlexContainer>
    </GameModeSelectContext.Provider>
  );
};

const Heading = ({ children, className, ...args }) => {
  return (
    <h1 className={`game-mode-select__heading ${className}`} {...args}>
      {children}
    </h1>
  );
};

const GameModesList = ({ children, className, ...args }) => {
  const { selectGameMode, isLoading, gameMode, currentLanguage } = useContext(
    GameModeSelectContext
  );

  const gameModesArray = Object.values(gameModesInfo);

  const GameModesList = useCallback(() => {
    return gameModesArray.map((data, index) => {
      return (
        <RadioButton
          className="game-mode-select__item"
          key={index}
          name="gameMode"
          aria-label="game-mode"
          id={data.value}
          value={JSON.stringify(data)}
          onChange={selectGameMode}
          disabled={isLoading}
          checked={data.value === gameMode?.value}
        >
          {data.title[currentLanguage] || data.title.EN}
        </RadioButton>
      );
    });
  }, [gameMode, currentLanguage, gameModesArray, isLoading, selectGameMode]);

  return (
    <SelectList
      className={`game-mode-select__list ${className}`}
      aria-label="game-modes-list"
      {...args}
    >
      {typeof children === 'function' ? (
        gameModesArray.map((data, index) => children(data, index))
      ) : (
        <GameModesList />
      )}
    </SelectList>
  );
};

GameModeSelect.Heading = Heading;
GameModeSelect.GameModesList = GameModesList;

export default GameModeSelect;
