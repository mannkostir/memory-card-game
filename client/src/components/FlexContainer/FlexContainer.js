import React from 'react';
import { StyledFlexContainer } from './FlexContainer.styles';

const FlexContainer = ({ children, ...args }) => {
  return <StyledFlexContainer {...args}>{children}</StyledFlexContainer>;
};

export default FlexContainer;
