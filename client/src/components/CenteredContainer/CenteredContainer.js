import React from 'react';
import { Container } from './CenteredContainer.styles';

const CenteredContainer = ({ children, ...args }) => {
  return <Container {...args}>{children}</Container>;
};

export default CenteredContainer;
