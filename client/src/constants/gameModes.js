// Maybe allow adding multiple modifiers to a single game mode
// In such case "modifier" field should be type of array
// and I should map through that array on game configuration

import {
  challengeGameLevels,
  defaultGameLevels,
} from 'domains/GameBoard/constants/gameLevels';

// Also in such case I should reflect on resolving conflicts
// E.g "difficulty" and "exact" inside the same game mode

export const gameModifiers = {
  levels: 'levels',
  difficulty: 'difficulty',
  exact: 'exact',
};

export const gameModesInfo = {
  customMode: {
    value: 'customMode',
    title: { EN: 'Classic', RU: 'Классика' },
    modifier: gameModifiers.difficulty,
    description: {
      EN: 'Classic game mode with customizable difficulty level.',
      RU: 'Классический режим игры с настраиваемым уровнем сложности.',
    },
  },
  challengeMode: {
    value: 'challengeMode',
    title: { EN: 'Challenge', RU: 'Испытание' },
    modifier: gameModifiers.levels,
    levels: challengeGameLevels,
    ranked: true,
    description: {
      EN:
        'Consists of several levels with different game modes. Result of the game will be scored at leaders table.',
      RU:
        'Состоит из нескольких уровней с разными режимами игры. Результат игры будет занесён в таблицу лидеров.',
    },
  },
  focusMode: {
    value: 'focusMode',
    title: { EN: 'Focus', RU: 'Фокусировка' },
    modifier: 4,
    description: {
      EN:
        'Cards will reveal themselves only once, at the beginning. There is only one chance to pick the right match, no mistakes allowed.',
      RU:
        'Карты откроются только один раз, в начале игры. Игрок должен по памяти открыть все верные совпадения, шанса на ошибку нет.',
    },
  },
  sprintMode: {
    value: 'sprintMode',
    title: { EN: 'Ladder', RU: 'Лестница' },
    modifier: gameModifiers.levels,
    levels: defaultGameLevels,
    description: {
      EN:
        'There will be several levels with increasing difficulty (number of matches).',
      RU:
        'В этом режиме будет несколько уровней с параллельным увеличением сложности (количества совпадений) на каждом.',
    },
  },
  memoryMode: {
    value: 'memoryMode',
    title: { EN: 'Memory', RU: 'Память' },
    modifier: gameModifiers.difficulty,
    description: {
      EN:
        'In this mode player is not allowed to open either of two cards of the same match twice.',
      RU:
        'В этом режиме игроку не позволяется открывать ни одну из двух совпадающих карт дважды.',
    },
  },
};
