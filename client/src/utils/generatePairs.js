import shuffle from './shuffleArray';

const generatePairs = (images = [], icon = null) => {
  if (!Array.isArray(images))
    throw new Error(
      `First arguments must be an array, received: ${typeof images}`
    );

  const matches = [];

  for (let i = 1; i <= images.length; i++) {
    [].push.apply(matches, [
      { value: i, id: i + 100, image: images[i - 1], icon },
      { value: i, id: i + 200, image: images[i - 1], icon },
    ]);
  }
  return shuffle(matches);
};

export default generatePairs;
