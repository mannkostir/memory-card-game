import React from 'react';
import { ErrorText } from './ErrorMessage.styles';

const ErrorMessage = ({ children, ...args }) => {
  return <ErrorText {...args}>{children}</ErrorText>;
};

export default ErrorMessage;
