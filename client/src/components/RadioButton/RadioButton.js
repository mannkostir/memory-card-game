import React from 'react';
import { StyledRadioButton } from './RadioButton.styles';

const RadioButton = ({
  children,
  style,
  id = Symbol(),
  className,
  ...args
}) => {
  return (
    <StyledRadioButton style={style}>
      <input type="radio" id={id} {...args} />
      <label htmlFor={id}>{children}</label>
    </StyledRadioButton>
  );
};

export default RadioButton;
