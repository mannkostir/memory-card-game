export const updateState = (state = {}, update = {}, localStorageKey = '') => {
  const updatedState = { ...state, ...update };

  if (localStorageKey)
    localStorage.setItem(localStorageKey, JSON.stringify(updatedState));

  return updatedState;
};
