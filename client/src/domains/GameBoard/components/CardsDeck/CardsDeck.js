import React from 'react';
import { cardsDeckText } from './CardsDeck.text';
import Cards from '../Cards';
import { useLanguageContext } from 'context/LanguageContext';
import Timer from '../Timer';
import { useGameState } from '../../context/GameContext';
import { useCards } from './useCards';
import FlexContainer from 'components/FlexContainer';
import ResetGameButton from '../ResetGameButton';
import { useToggle } from 'hooks/useToggle';
import { useState } from 'react';
import ModalDialog from 'components/ModalDialog';
import Button from 'components/Button';
import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useEffect } from 'react';
import { FinishGameText } from './CardsDeck.styles';
import { useGame } from 'domains/GameBoard/hooks/useGame';

const CardsDeck = ({
  isCardsRevealed = false,
  timer = <Timer style={{ fontSize: '1.5em' }} />,
  ...args
}) => {
  const {
    currentScore,
    currentLevel,
    levelsAmount,
    currentMatches,
    gameMode,
  } = useGameState();

  const [isGameFinished, setIsGameFinished] = useState(false);

  const { setIsOverlay } = useAppLookDispatch();

  const {
    isDisabled,
    isLoaded,
    isFlipped,
    selectCard,
    handleCardsLoading,
    finishGame,
  } = useCards({
    gameFinishHandler: () => {
      setIsGameFinished(true);
    },
  });

  const { resetGame } = useGame();

  const { currentLanguage } = useLanguageContext();

  const { levelAnnotation } = cardsDeckText;

  useEffect(() => {
    setIsOverlay(isGameFinished);
    return () => setIsOverlay(false);
  }, [isGameFinished]);

  return (
    <div aria-label="deck-of-cards">
      <h1>{gameMode.title[currentLanguage]}</h1>
      <FlexContainer
        style={{
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '0 auto',
        }}
      >
        <Button onClick={resetGame}>
          {cardsDeckText.resetGameButton[currentLanguage]}
        </Button>
        {currentLevel ? (
          <h3>
            {levelAnnotation(currentLevel, levelsAmount)[currentLanguage]}
          </h3>
        ) : null}
        {timer}
      </FlexContainer>
      <ModalDialog
        isOpen={isGameFinished}
        onClose={() => {
          setIsGameFinished(false);
          finishGame();
        }}
      >
        <FinishGameText>
          {cardsDeckText.finishGameText[currentLanguage]}
        </FinishGameText>
        <br />
        <Button
          onClick={() => {
            setIsGameFinished(false);
            finishGame();
          }}
        >
          {cardsDeckText.continueButton[currentLanguage]}
        </Button>
      </ModalDialog>
      <Cards
        currentMatches={currentMatches}
        isCardsRevealed={isCardsRevealed}
        isDisabled={isDisabled}
        isLoaded={isLoaded}
        handleCardsLoading={handleCardsLoading}
        isFlipped={isFlipped}
        selectCard={selectCard}
        {...args}
      />
    </div>
  );
};

export default CardsDeck;
