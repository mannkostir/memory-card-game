import { useAuthState } from 'context/AuthContext';
import { useLoadingContext } from 'context/LoadingContext';
import { useDOM } from 'hooks/useDOM';
import { useFonts } from 'hooks/useFonts';
import { useLocationChange } from 'hooks/useLocationChange/useLocationChange';
import { useRoutes } from 'hooks/useRoutes';
import { useEffect, useState } from 'react';

export const Routes = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});

  const { isDOMLoaded } = useDOM();
  const { isFontsLoaded } = useFonts();

  const { isAuthenticated } = useAuthState();

  const { initRoutes } = useRoutes();

  const { setLoaderVisibility } = useLoadingContext('Routes loader');

  useLocationChange((location) => {
    if (location.pathname !== currentLocation.pathname) {
      setIsReady(false);
      setCurrentLocation(location);
    }
  });

  useEffect(() => {
    setLoaderVisibility(!isReady);
  }, [isReady, setLoaderVisibility]);

  useEffect(() => {
    setIsReady(!!(isDOMLoaded && isFontsLoaded && currentLocation.pathname));
  }, [isDOMLoaded, isFontsLoaded, currentLocation]);

  return initRoutes(isAuthenticated);
};
