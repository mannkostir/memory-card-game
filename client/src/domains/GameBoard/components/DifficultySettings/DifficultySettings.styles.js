import styled from 'styled-components';

export const Line = styled.div`
  position: relative;
  /* font-weight: 900; */
  height: auto;
  width: auto;
  margin-bottom: 30px;
  /* font-size: 0.8em; */
  transition: 0.3s ease;
  cursor: pointer;
  &:hover {
    border-top-left-radius: 10px;
    span {
      text-decoration: underline;
    }
  }
`;
