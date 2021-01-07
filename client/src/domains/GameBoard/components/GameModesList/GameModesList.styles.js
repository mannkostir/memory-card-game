import GameModeSelect from 'components/GameModeSelect';
import styled from 'styled-components';

export const StyledGameModeSelect = styled(GameModeSelect)`
  .game-mode-select__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
    @media (max-width: 1024px) {
      flex-direction: column;
    }
  }

  .game-mode-select__list > div {
    margin-right: 2em;
    width: 40%;
    width: 35vw;
    @media (max-width: 1024px) {
      margin: 0;
      width: 60vw;
    }
  }
  .game-mode-select__list > *:nth-child(even) {
    margin-top: 7em;
    @media (max-width: 1024px) {
      margin-top: 4em;
    }
  }
  .game-mode-select__list > *:nth-child(odd) {
    margin-top: 3.5em;
    @media (max-width: 1024px) {
      margin-top: 4em;
    }
  }
  .game-mode-select__list > * label {
    border: 3px solid ${({ theme }) => theme.colors.secondary.dark};
    transition: 0.3s ease;
    font-size: 1em;
  }
  .game-mode-select__list > *:hover label {
    background-color: ${({ theme }) => theme.colors.secondary.main} !important;
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: 1.1em !important;
    > h3 {
      text-decoration: underline;
      text-underline-offset: 0.1em;
    }
  }
  .game-mode-select__list > * label:active {
    box-shadow: none;
  }
  .game-mode-select__list > *:last-child label {
    margin-bottom: 0;
  }
`;
