import styled from 'styled-components';

export const StyledPreloader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  background: ${({ theme }) => theme.colors.background};
  & > * {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
  }
`;
