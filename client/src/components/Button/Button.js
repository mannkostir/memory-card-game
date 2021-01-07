import React from 'react';
import { StyledButton } from './Button.styles';

const Button = ({ children, ...args }) => {
  return (
    <StyledButton data-state="initial" {...args}>
      {children}
    </StyledButton>
  );
};

export default Button;
