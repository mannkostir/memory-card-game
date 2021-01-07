import React from 'react';
import { StyledCard, BackFace, FrontFace } from './Card.styles';

const Card = ({
  flipped = false,
  onClick = () => {},
  disabled = false,
  frontFace = new Image(),
  backFace = new Image(),
  handleLoad = () => {},
  show = false,
  ...args
}) => {
  return (
    <StyledCard
      className="card"
      onClick={disabled || flipped ? null : onClick}
      data-flipped={flipped}
      style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}
      {...args}
    >
      <BackFace src={`${backFace}`} onLoad={handleLoad} />
      <FrontFace src={`${frontFace}`} />
    </StyledCard>
  );
};

export default Card;
