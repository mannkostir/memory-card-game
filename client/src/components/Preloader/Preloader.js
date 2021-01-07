import React from 'react';
import { StyledPreloader } from './Preloader.styles';

const Preloader = ({ isVisible = true, children }) => {
  return (
    <StyledPreloader
      style={
        isVisible
          ? { opacity: '1', visibility: 'visible' }
          : { opacity: '0', visibility: 'hidden', transition: '0.5s ease' }
      }
      aria-label="preloader"
      id="preloader"
    >
      {children}
    </StyledPreloader>
  );
};

export default Preloader;
