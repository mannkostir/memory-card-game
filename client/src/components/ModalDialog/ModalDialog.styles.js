import styled from 'styled-components';

export const StyledDialog = styled.div`
  position: fixed;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.onPrimary};
  z-index: 100;
  padding: 5%;
  min-height: 30%;
  min-width: 30%;
  border-radius: 5%;
  box-shadow: 0 0 10px 4px ${({ theme }) => theme.colors.primary.dark};
`;

export const CloseDialogButton = styled.button`
  position: absolute;
  right: 5%;
  top: 5%;
  font-size: 1.5em;
  color: ${({ theme }) => theme.colors.onPrimary};
  :hover {
    color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

export const CloseDialogIcon = styled.i``;
