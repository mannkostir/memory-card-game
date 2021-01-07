import styled from 'styled-components';

export const SeparatorLine = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 2em;
  margin-top: 4em;
  margin-bottom: 4em;
  background-color: ${({ theme }) => theme.colors.secondary.main};
`;
