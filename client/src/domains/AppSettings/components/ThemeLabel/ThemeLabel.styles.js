import styled from 'styled-components';

export const StyledThemeLabel = styled.label`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
  cursor: pointer;
  img {
    transition: 0.2s ease-in-out;
  }
  :hover img {
    transform: scale(1.2);
  }
`;
