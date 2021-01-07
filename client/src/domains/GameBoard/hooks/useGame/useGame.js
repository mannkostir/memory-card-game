import { useMemo } from 'react';
import generatePairs from 'utils/generatePairs';
import { useGameContext } from '../../context/GameContext/useGameContext';
import { useTimerDispatch } from '../../context/TimerContext/useTimerDispatch';
import { useAuthState } from 'context/AuthContext/useAuthState';
import { useLoading } from 'hooks/useLoading';
import { useAPI } from 'hooks/useAPI';
import cardsThemes from 'constants/cardsThemes';
import { useAppLookState } from 'context/AppLookContext/useAppLookState';
import { useTimerContext } from 'domains/GameBoard/context/TimerContext';

export const useGame = () => {
  const {
    levels,
    currentLevel,
    matchesAmount,
    currentMatches,
    gameMode,
    currentScore,
    setCurrentLevel,
    initializeMatches,
    resetGameContext,
    setResolvedMatches,
  } = useGameContext();

  const { cardsThemeRef } = useAppLookState();

  const { startLoading, finishLoading } = useLoading(false, true);

  const { passedTime, resetTimer } = useTimerContext();

  const { isAuthenticated } = useAuthState();

  const api = useAPI();

  const isGameConfigured = useMemo(() => {
    return currentMatches.length;
  }, [currentMatches]);

  const initGame = async ({
    nextMatchesAmount = 1,
    difficulty = { modifier: 1 },
  }) => {
    try {
      const matchesAmount = nextMatchesAmount <= 0 ? 1 : nextMatchesAmount;

      const currentCardsTheme = Object.values(cardsThemes).find(
        (theme) => theme.ref === cardsThemeRef
      );

      const modifier = difficulty.modifier || 1;

      const rawCards = await currentCardsTheme.fetchCards(
        matchesAmount * modifier
      );
      const cards = await rawCards.json();

      const images = currentCardsTheme.getImages(cards);

      const pairs = generatePairs(images, currentCardsTheme.icon);

      if (!pairs) throw new Error('Something went wrong');

      initializeMatches(pairs);
    } catch (e) {
      throw e;
    }
  };

  const nextLevel = async () => {
    initGame({ nextMatchesAmount: levels[currentLevel + 1].matchesAmount });

    setCurrentLevel(currentLevel + 1);
    setResolvedMatches([]);
  };

  const resetGame = () => {
    resetGameContext();
    resetTimer();
  };

  const finishGame = async (victory = true) => {
    startLoading();
    if (isAuthenticated) {
      const score = parseInt(
        (currentScore * 100) /
          ((passedTime.minutes + 1) * 60 + passedTime.seconds + 1)
      );

      await api.saveToHistory(victory, {
        matchesAmount,
        gameMode: gameMode.value,
        score,
        passedTime,
      });

      if (gameMode.ranked) {
        await api.updateHighscore(score);
      }
    }
    finishLoading();
    resetGame();
  };

  return { isGameConfigured, initGame, nextLevel, finishGame, resetGame };
};
