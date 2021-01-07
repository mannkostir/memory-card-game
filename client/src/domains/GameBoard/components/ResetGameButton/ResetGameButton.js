import React from 'react';
import { useGame } from '../../hooks/useGame';
import Button from 'components/Button';

const ResetGameButton = ({ text }) => {
  const { resetGame } = useGame();

  return <Button onClick={resetGame}>{text || 'Reset Game'}</Button>;
};

export default ResetGameButton;
