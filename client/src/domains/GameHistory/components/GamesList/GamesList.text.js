import React from 'react';

export const text = {
  historyItem: (matchesAmount, passedSeconds, passedMinutes) => ({
    EN: (
      <span>
        Resolved <strong>{matchesAmount} matches</strong> in{' '}
        <strong>
          {`${passedMinutes} minutes and ${passedSeconds} seconds` ||
            'a couple of seconds'}
        </strong>
        .
      </span>
    ),
    RU: (
      <span>
        Открыто <strong>{matchesAmount} совпадений</strong> за{' '}
        <strong>
          {`${passedMinutes} минут и ${passedSeconds} секунд` || 'пару секунд'}
        </strong>
        .
      </span>
    ),
  }),
  noEntries: {
    EN: 'No game records',
    RU: 'Нет записей',
  },
};
