import styled from 'styled-components';

export const LanguageSelectWrapper = styled.div`
  text-align: right;
  > *:not(:last-child) {
    margin-right: 0.5em;
  }
`;

export const LanguageSelectButton = styled.button`
  opacity: 0.8;
  border: 2px dashed ${({ theme }) => theme.colors.onBackground};
  font-size: 0.8em;
  padding: 0.5em;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.onBackground};
  background: transparent;
  font-family: inherit;
  :hover {
    opacity: 1;
    border: 2px solid ${({ theme }) => theme.colors.onBackground};
    color: ${({ theme }) => theme.colors.onBackground};
  }
  &[aria-selected='true'] {
    opacity: 1;
    border: 2px solid ${({ theme }) => theme.colors.secondary.main};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.onSurface};
    font-weight: 700;
  }
`;
