import styled from 'styled-components';

export const StyledRadioButton = styled.div`
  position: relative;
  height: 100%;
  input {
    display: none;
  }
  label {
    text-align: center;
    display: block;
    padding: 0.5em 1em;
    background-color: ${({ theme }) => theme.colors.surface};
    border: 4px solid ${({ theme }) => theme.colors.secondary.dark};
    color: ${({ theme }) => theme.colors.onSurface};
    border-radius: 1em;
    font-size: 1em;
    user-select: none;
    cursor: pointer;
    box-shadow: 5px 5px 12px ${({ theme }) => theme.colors.black};
  }
  label:hover {
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.secondary.light};
  }
  input:checked + label {
    transition: 0.2s ease;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.secondary.main};
    font-size: 1.2em;
    font-weight: 600;
  }
  input:disabled + label {
    background-color: grey;
    filter: grayscale(100%);
    cursor: not-allowed;
  }
`;
