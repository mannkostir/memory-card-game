import { useMount } from 'hooks/useMount';
import { useState } from 'react';

export const useDOM = () => {
  const [isDOMLoaded, setIsDOMLoaded] = useState(false);

  useMount(() => {
    setIsDOMLoaded(true);
  });

  return { isDOMLoaded };
};
