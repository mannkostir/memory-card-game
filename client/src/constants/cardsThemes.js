// For each card theme "getCards" method must be specified explicitly

const playingCards = {
  title: { EN: 'Playing Cards', RU: 'Игральные Карты' },
  ref: 'playingCards',
  fetchCards: async (amount) =>
    await fetch(
      `https://deckofcardsapi.com/api/deck/new/draw/?count=${amount}`
    ),
  url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=',
  icon: require('assets/playing-cards.png'),
  getImages: (raw) =>
    raw.cards.map(
      (card) =>
        Object.keys(card)
          .filter((key) => key === 'image')
          .reduce((obj, key) => [...obj, card[key]], [])[0]
    ),
};

const dogs = {
  title: { EN: 'Dogs', RU: 'Собаки' },
  ref: 'dogs',
  fetchCards: async (amount) =>
    await fetch(`https://dog.ceo/api/breeds/image/random/${amount}`),
  url: 'https://dog.ceo/api/breeds/image/random/',
  icon: require('assets/dog.png'),
  getImages: (obj) => obj.message,
};

export default { playingCards, dogs };
