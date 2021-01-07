import React from 'react';
import Card from '../Card';
import Preloader from 'components/Preloader';
import { CardsContainer } from './Cards.styles';

const Cards = ({
  currentMatches = [],
  isCardsRevealed = false,
  isDisabled = false,
  isLoaded = false,
  isFlipped = (card = {}) => false,
  selectCard = (card = {}) => ({}),
  handleCardsLoading = () => {},
  ...args
}) => {
  return (
    <CardsContainer>
      {currentMatches.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          value={card.value}
          disabled={isDisabled}
          flipped={isFlipped(card) || isCardsRevealed}
          frontFace={card.icon}
          backFace={card.image}
          onClick={() => selectCard(card)}
          handleLoad={handleCardsLoading}
          show={isLoaded}
          aria-label="card"
          {...args}
        />
      ))}
    </CardsContainer>
  );
};

export default Cards;
