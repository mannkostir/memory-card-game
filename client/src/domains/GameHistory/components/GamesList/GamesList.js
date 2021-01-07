import Button from 'components/Button';
import { useLanguageContext } from 'context/LanguageContext';
import { usePagination } from 'hooks/usePagination';
import React, { useEffect } from 'react';
import { text } from './GamesList.text';

const GamesList = ({
  isLoading = true,
  gameModeValue = '',
  gameHistory = [],
  recordsAmount = 0,
  setQuery = () => {},
}) => {
  const {
    itemsPerPage,
    currentPage,
    previousPage,
    nextPage,
    PageLinks,
  } = usePagination({
    itemsPerPage: 2,
    itemsAmount: recordsAmount,
  });

  const { currentLanguage } = useLanguageContext();

  useEffect(() => {
    setQuery({
      gameMode: gameModeValue ? gameModeValue : '',
      limit: itemsPerPage ? itemsPerPage : '',
      start:
        itemsPerPage && currentPage ? itemsPerPage * (+currentPage - 1) : '',
    });
  }, [gameModeValue, currentPage, itemsPerPage, setQuery]);

  return (
    <ul aria-label="games-list" style={{ marginTop: '4em' }}>
      {(() => {
        if (!gameHistory.length && gameModeValue)
          return text.noEntries[currentLanguage];

        if (!gameHistory.length && !gameModeValue) return null;

        return (
          <>
            {gameHistory.map((item, i) => (
              <li key={i}>
                {
                  text.historyItem(
                    item.matchesAmount,
                    item.passedTime.seconds,
                    item.passedTime.minutes
                  )[currentLanguage]
                }
              </li>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2em',
              }}
            >
              <Button onClick={previousPage}>
                <i class="fas fa-angle-left"></i>
              </Button>
              <PageLinks
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  fontSize: '1.5em',
                }}
              />
              <Button onClick={nextPage}>
                <i class="fas fa-angle-right"></i>
              </Button>
            </div>
          </>
        );
      })()}
    </ul>
  );
};

export default GamesList;
