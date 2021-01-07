import styled from 'styled-components';

export const ChangeConfirmWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: 1.5em;
  opacity: 93%;
  z-index: 100;
  box-shadow: 0 0 15px ${({ theme }) => theme.colors.secondary.dark};
  button {
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`;

export const RemoveEntryIcon = styled.i`
  color: ${({ theme }) => theme.colors.onPrimary};
  margin-right: 0.8em;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ConfirmChangesButton = styled.button`
  color: ${({ theme }) => theme.colors.onPrimary};
  margin-right: 1em;
  i {
    color: ${({ theme }) => theme.colors.success};
    margin-left: 0.3em;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const DiscardChangesButton = styled.button`
  color: ${({ theme }) => theme.colors.onPrimary};
  i {
    color: ${({ theme }) => theme.colors.error};
    margin-left: 0.3em;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin: 1em 1em 0.5em 1em;
  flex-flow: row wrap;
  justify-content: center;
`;
