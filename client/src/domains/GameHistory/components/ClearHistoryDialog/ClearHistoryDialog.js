import React from 'react';
import ModalDialog from 'components/ModalDialog';
import { gameModesInfo } from 'constants/gameModes';
import { useLanguageContext } from 'context/LanguageContext';
import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAPI } from 'hooks/useAPI';
import {
  ClearHistoryButton,
  ClearHistoryLabel,
} from './ClearHistoryDialog.styles';
import * as text from './ClearHistoryDialog.text';

const ClearHistoryDialog = ({ isVisible = false, onClose = () => {} }) => {
  const { currentLanguage } = useLanguageContext();

  const { setIsOverlay } = useAppLookDispatch();

  const [gameModesToCleanUp, setGameModesToCleanUp] = useState([]);

  const api = useAPI();

  const onSubmit = async (e) => {
    e.preventDefault();

    await api.clearHistory(gameModesToCleanUp);

    onClose();
  };

  const onChange = (e) => {
    // Storing e.target.name in a variable is necessary
    // Because setState is async and event is synthetic
    // Event nullifies by the time async function is executed

    const name = e.target.name;

    let filteredGameModes = gameModesToCleanUp.filter(
      (gameMode) => gameMode !== name
    );

    if (gameModesToCleanUp.length !== filteredGameModes.length) {
      setGameModesToCleanUp(filteredGameModes);
    } else {
      setGameModesToCleanUp([...filteredGameModes, name]);
    }
  };

  const selectAll = (e) => {
    const allGameModes = Object.values(gameModesInfo).map(
      (gameMode) => gameMode.value
    );

    if (gameModesToCleanUp.length === allGameModes.length) {
      setGameModesToCleanUp([]);
    } else {
      setGameModesToCleanUp(allGameModes);
    }
  };

  useEffect(() => {
    setIsOverlay(isVisible);
  }, [isVisible, setIsOverlay]);

  return (
    <ModalDialog isOpen={isVisible} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <ul>
          <li
            style={{
              marginBottom: '1.5em',
              fontWeight: '900',
            }}
          >
            <ClearHistoryLabel>
              <input
                type="checkbox"
                name="all"
                onChange={selectAll}
                checked={
                  gameModesToCleanUp.length ===
                  Object.keys(gameModesInfo).length
                }
              />
              {text.inputLabels.all[currentLanguage]}
            </ClearHistoryLabel>
          </li>
          {Object.values(gameModesInfo).map((gameMode, i) => (
            <li key={i}>
              <ClearHistoryLabel>
                <input
                  type="checkbox"
                  name={gameMode.value}
                  onChange={onChange}
                  checked={gameModesToCleanUp.some(
                    (selectedGameMode) => selectedGameMode === gameMode.value
                  )}
                />
                {gameMode.title[currentLanguage]}
              </ClearHistoryLabel>
            </li>
          ))}
        </ul>
        <ClearHistoryButton
          type="submit"
          value={text.buttons.clearHistory[currentLanguage]}
        />
      </form>
    </ModalDialog>
  );
};

export default ClearHistoryDialog;
