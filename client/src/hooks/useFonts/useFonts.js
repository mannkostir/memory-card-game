import { useMount } from 'hooks/useMount';
import { useState } from 'react';

export const useFonts = () => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useMount(() => {
    document.fonts.ready.then(() => {
      setIsFontsLoaded(true);
    });
    return () => setIsFontsLoaded(false);
  });

  return { isFontsLoaded };
};
