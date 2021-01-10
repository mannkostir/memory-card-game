import styled from 'styled-components';

export const SeparatorLine = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 2em;
  margin-top: 3em;
  margin-bottom: 3em;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  opacity: 80%;
`;
