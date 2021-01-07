import { useEffect, useCallback, useMemo } from 'react';
import { useGameContext } from '../../context/GameContext';
import { gameEventTypes } from '../../context/GameEventsContext';
import { useMount } from 'hooks/useMount';

export const useCardSelection = ({
  selectedCards,
  setSelectedCards,
  setIsDisabled,
  emitEvent,
}) => {
  const {
    resolvedMatches,
    resolveMatches,
    updateCurrentScore,
    setCurrentScore,
    currentScore,
  } = useGameContext();

  const isFlipped = useCallback(
    (currentCard) => {
      return (
        selectedCards.some((item) => item.id === currentCard.id) ||
        resolvedMatches.some((item) => item.value === currentCard.value)
      );
    },
    [resolvedMatches, selectedCards]
  );

  const isMatch = useMemo(() => {
    if (selectedCards.length < 2) return;
    const currentCardValues = selectedCards.reduce(
      (acc, curr) => [...acc, curr.value],
      []
    );

    return new Set(currentCardValues).size === 1;
  }, [selectedCards]);

  const selectCard = ({ id, value }) => {
    const currentCard = { id: +id, value };

    const hasFlippedCard = !!selectedCards.length;

    setSelectedCards((selected) => [...selected, currentCard]);

    setIsDisabled(hasFlippedCard);

    emitEvent(gameEventTypes.cardSelected, currentCard);
  };

  const resetSelection = useCallback(() => {
    localStorage.removeItem('selectedCards');
    setSelectedCards([]);
    setIsDisabled(false);
  }, [setSelectedCards, setIsDisabled]);

  useMount(() => {
    const selectedCardsStorage = JSON.parse(
      localStorage.getItem('selectedCards')
    );

    if (selectedCardsStorage) setSelectedCards(selectedCardsStorage);

    return () => resetSelection();
  });

  useEffect(() => {
    localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
  }, [selectedCards]);

  const checkMatching = useCallback(() => {
    if (selectedCards.length < 2) return;

    if (isMatch) {
      resetSelection();
      resolveMatches(selectedCards);

      emitEvent(gameEventTypes.matchedSuccessfully, selectedCards);
    } else {
      resetSelection();
      emitEvent(gameEventTypes.matchedUnsuccessfully, selectedCards);
    }
  }, [resetSelection, resolveMatches, emitEvent]);

  useEffect(() => {
    if (isMatch) {
      updateCurrentScore((score) => score + 100);
    }
  }, [isMatch]);

  // Request animation frame?

  useEffect(() => {
    let animationTimeout = setTimeout(checkMatching, 500);
    return () => clearTimeout(animationTimeout);
  }, [selectedCards, checkMatching]);

  return {
    selectedCards,
    isFlipped,
    selectCard,
    checkMatching,
  };
};
