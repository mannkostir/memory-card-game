import React, { useState } from 'react';
import { useAPI } from 'hooks/useAPI';
import { useMount } from 'hooks/useMount';
import {
  StyledTable,
  GoldTrophyIcon,
  SilverTrophyIcon,
  BronzeTrophyIcon,
} from './LeadersTable.styles';
import * as text from './LeadersTable.text';
import { useLanguageContext } from 'context/LanguageContext';
import { useAppLookState } from 'context/AppLookContext/useAppLookState';

const LeadersTable = () => {
  const [currentHighscores, setCurrentHighscores] = useState([]);

  const { currentLanguage } = useLanguageContext();

  const api = useAPI({ isLoading: true });

  const fetchHighscores = async () => {
    const highscores = await api.getHighscores();

    setCurrentHighscores(highscores);
  };

  useMount(() => {
    fetchHighscores();
  });

  const { appTheme } = useAppLookState();

  return api.isLoading ? (
    'Loading...'
  ) : (
    <StyledTable>
      <thead>
        <tr>
          <th>{text.tableHeadings.position[currentLanguage]}</th>
          <th>{text.tableHeadings.name[currentLanguage]}</th>
          <th>{text.tableHeadings.score[currentLanguage]}</th>
        </tr>
      </thead>
      <tbody>
        {currentHighscores.map((highscore, i) => (
          <tr
            key={++i}
            style={
              i % 2 === 0
                ? { backgroundColor: appTheme.colors.primary.light }
                : { backgroundColor: appTheme.colors.primary.main }
            }
          >
            <td>
              {i}
              {i <= 3 &&
                (i === 1 ? (
                  <GoldTrophyIcon className={'fas fa-trophy'} />
                ) : i === 2 ? (
                  <SilverTrophyIcon className={'fas fa-trophy'} />
                ) : i === 3 ? (
                  <BronzeTrophyIcon className={'fas fa-trophy'} />
                ) : null)}
            </td>
            <td style={{ textDecoration: 'underline' }}>
              {highscore.user.username}
            </td>
            <td>{highscore.score}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeadersTable;
