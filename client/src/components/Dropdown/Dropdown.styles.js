import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const StyledToggleTrigger = styled.button`
  font-family: 'Pattaya';
  font-size: 1.5em;
  letter-spacing: 0.1em;
  padding: 0.2em 0.4em;
  transition: 0.1s ease;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.onPrimary};
  &:hover {
    color: ${({ theme }) => theme.colors.onSecondary};
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
  &[aria-label='collapse'] {
    color: ${({ theme }) => theme.colors.onSecondary};
    background-color: ${({ theme }) => theme.colors.secondary.dark};
  }
  &:active {
    background-color: transparent;
  }
`;

export const StyledDropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  color: ${({ theme }) => theme.colors.onSecondary};
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.black};
  padding: 1.4em 1.6em;
  > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    > * {
      width: 100%;
      text-align: center;
      margin-bottom: 1em;
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: underline;
      }
    }
  }
`;
