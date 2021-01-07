import GameModeSelect from 'components/GameModeSelect';
import styled from 'styled-components';

export const StyledGameModeSelect = styled(GameModeSelect)`
  ul {
    display: flex;
    flex-flow: row wrap;
  }
  div {
    margin-bottom: 1em;
  }
  div:not(:last-child) {
    margin-right: 0.5em;
  }
`;
