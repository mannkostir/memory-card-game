const fetchCards = async () => {
  const cards = await fetch(
    'https://deckofcardsapi.com/api/deck/new/draw/?count=2'
  );
  const res = cards.json();
  return res;
};
