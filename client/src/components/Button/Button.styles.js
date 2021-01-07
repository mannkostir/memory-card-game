import styled from 'styled-components';

export const StyledButton = styled.button`
  font-family: 'Neucha';
  font-size: 1em;
  display: inline-block;
  border: 2px solid ${({ theme }) => theme.colors.secondary.light};
  box-shadow: 0 0 5px 1px ${({ theme }) => theme.colors.secondary.dark};
  padding: 0.35em 0.6em;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondary.main};
  outline: none;
  color: ${({ theme }) => theme.colors.onSecondary};
  border-radius: 10px;
  letter-spacing: 0.1em;
  :active {
    box-shadow: none;
  }
  :hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary.main};
  }
  :disabled {
    box-shadow: none;
    color: gray;
  }
`;
