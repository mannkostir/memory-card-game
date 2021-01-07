import { cardMaxWidth, cardWidth } from '../../constants/styles';
import styled from 'styled-components';

export const StyledCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  user-select: none;
  width: 13vw;
  height: 13vw;
  max-width: 200px;
  max-height: 200px;
  transform-style: preserve-3d;
  transform: scale(1);
  transition: transform 0.5s ease;
  font-size: 32px;
  border-radius: 0.3em;
  box-shadow: 1px 1px 3px 1px;
  &:active {
    transition: transform 0.2s ease;
    transform: scale(0.95);
  }
  &[data-flipped='true'] {
    transform: rotateY(180deg);
  }
  @media (max-width: 1024px) {
    width: 20vw;
    height: 20vw;
  }
`;

export const BackFace = styled.img`
  border-radius: inherit;
  box-shadow: inherit;
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
`;
export const FrontFace = styled.img`
  border-radius: inherit;
  box-shadow: inherit;
  backface-visibility: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  position: absolute;
  width: 100%;
  height: 100%;
`;
