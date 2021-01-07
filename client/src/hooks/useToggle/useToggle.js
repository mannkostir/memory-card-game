import { useState } from 'react';

export const useToggle = (initialState = false) => {
  const [isOn, setIsOn] = useState(initialState);

  const toggle = () => {
    setIsOn((isOn) => !isOn);
  };

  return { isOn, toggle };
};
