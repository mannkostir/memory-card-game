import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLocationChange = (onLocationChange = (location) => {}) => {
  const location = useLocation();

  useEffect(() => {
    onLocationChange(location);
  }, [location, onLocationChange]);
};
