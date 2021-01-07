import styled from 'styled-components';

export const DeletionWarning = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8em;
  margin-top: 0.5em;
`;

export const DeleteUserButton = styled.button`
  color: ${({ theme }) => theme.colors.error};
  &:hover {
    text-decoration: underline;
  }
`;
