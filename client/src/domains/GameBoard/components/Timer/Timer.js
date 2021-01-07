import React from 'react';
import { useTimerContext } from '../../context/TimerContext/useTimerContext';
import { useInterval } from 'hooks/useInterval';
import styled from 'styled-components';

const TimerContainer = styled.div`
  display: inline-block;
`;
const StyledTimer = styled.span``;

const Timer = ({ style }) => {
  const { passedTime, isTimerActive, updatePassedTime } = useTimerContext();

  const { seconds, minutes } = passedTime;

  useInterval(() => {
    if (!isTimerActive) return;

    if (seconds === 59) {
      updatePassedTime((time) => ({
        ...time,
        seconds: 0,
        minutes: minutes + 1,
      }));
    } else {
      updatePassedTime((time) => ({ ...time, seconds: seconds + 1 }));
    }
  }, 1000);

  return (
    <TimerContainer aria-label="timer">
      <StyledTimer style={style}>
        {`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
      </StyledTimer>
    </TimerContainer>
  );
};

export default Timer;
