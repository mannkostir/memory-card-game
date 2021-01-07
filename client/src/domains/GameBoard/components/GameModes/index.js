import { CustomGame } from './CustomGame';
import { ChallengeGame } from './ChallengeGame';
import { FocusGame } from './FocusGame';
import { SprintGame } from './SprintGame';
import { MemoryGame } from './MemoryGame';

import { gameModesInfo } from 'constants/gameModes';

const gameModeComponents = {
  [gameModesInfo.customMode.value]: CustomGame,
  [gameModesInfo.challengeMode.value]: ChallengeGame,
  [gameModesInfo.focusMode.value]: FocusGame,
  [gameModesInfo.sprintMode.value]: SprintGame,
  [gameModesInfo.memoryMode.value]: MemoryGame,
};

const assignComponentsToGameModes = (gameModesInfo = {}) => {
  let result = {};

  for (let gameMode in gameModesInfo) {
    const data = gameModesInfo[gameMode];
    const value = data.value;

    result = {
      ...result,
      [value]: { ...data, _component: gameModeComponents[value] },
    };
  }

  return result;
};

export const gameModes = assignComponentsToGameModes(gameModesInfo);
