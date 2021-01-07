export const omitUnderscoredFields = (obj) =>
  Object.keys(obj).reduce((acc, curr) => {
    if (curr[0] !== '_') acc[curr] = obj[curr];
    return acc;
  }, {});
