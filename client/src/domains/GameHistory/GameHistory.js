import React, { useEffect, useState } from 'react';
import GameModeSelect from 'components/GameModeSelect';
import FlexContainer from 'components/FlexContainer';
import GamesList from './components/GamesList';
import { useAPI } from 'hooks/useAPI';
import Button from 'components/Button';
import { useQuery } from './components/GamesList/useQuery';
import { useLanguageContext } from 'context/LanguageContext';
import { text } from './GameHistory.text';
import ClearHistoryDialog from './components/ClearHistoryDialog';
import { useGameHistory } from './hooks/useGameHistory/useGameHistory';
import { StyledGameModeSelect } from './GameHistory.styles';
import { useLoading } from 'hooks/useLoading';

const GameHistory = () => {
  const [historyFor, setHistoryFor] = useState('');
  const api = useAPI();

  const { query, changeQuery } = useQuery([]);

  const { isLoading, startLoading, finishLoading } = useLoading(false);

  const { gameHistory, recordsAmount, fetchHistory } = useGameHistory();

  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);

  const { currentLanguage } = useLanguageContext();

  useEffect(() => {
    if (!query.gameMode) return;

    try {
      startLoading();
      const formattedQuery = Object.entries(query).reduce(
        (acc, query, index, arr) => {
          if (query[0] && query[1]) {
            if (!acc) {
              acc += `?${query[0]}=${query[1]}`;
            } else if (index < arr.length) {
              acc += `&${query[0]}=${query[1]}`;
            }
          }
          return acc;
        },
        ''
      );

      (async () => {
        await fetchHistory(formattedQuery);
      })();
    } catch (e) {
      throw e;
    } finally {
      finishLoading();
    }
  }, [query, fetchHistory]);

  return (
    <section>
      <FlexContainer>
        <h1>{text.mainHeading[currentLanguage]}</h1>
        <ClearHistoryDialog
          isVisible={showClearHistoryModal}
          onClose={() => setShowClearHistoryModal((isOn) => !isOn)}
        />
        <Button
          onClick={() => setShowClearHistoryModal(true)}
          disabled={api.isLoading}
          style={{
            alignSelf: 'flex-end',
            marginBottom: '3em',
            marginRight: '10vw',
          }}
        >
          {text.clearHistoryBtn[currentLanguage]}
        </Button>
        <StyledGameModeSelect
          handleModeSelection={(gameMode) => setHistoryFor(gameMode.value)}
          defaultMode={historyFor}
          currentLanguage={currentLanguage}
        >
          <GameModeSelect.GameModesList />
        </StyledGameModeSelect>
        <GamesList
          gameModeValue={historyFor}
          gameHistory={gameHistory}
          recordsAmount={recordsAmount}
          setQuery={changeQuery}
          isLoading={isLoading}
        />
      </FlexContainer>
    </section>
  );
};

export default GameHistory;
