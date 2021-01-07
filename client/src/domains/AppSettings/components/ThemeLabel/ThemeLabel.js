import React from 'react';
import { StyledThemeLabel } from './ThemeLabel.styles';

const ThemeLabel = ({ children, ...args }) => {
  return <StyledThemeLabel {...args}>{children}</StyledThemeLabel>;
};

export default ThemeLabel;
