import styled, { createGlobalStyle } from 'styled-components';

export const AppStyle = createGlobalStyle`
  body {
    font-family: 'Balsamiq Sans';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 0.07em;
    line-height: 150%;
    background: ${({ theme }) => theme.colors.background};
    background-size: cover;
    background-attachment: fixed;
    margin: 0;
    color: ${({ theme }) => theme.colors.onBackground};
    box-sizing: border-box;
    transition: background-color 0.5s ease;
    transition: color 0.5s ease;
    &[isoverlay="true"]::before {
      content: '';
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      background: rgb(0, 0, 0);
      background: rgba(0, 0, 0, 0.7);
      overflow-x: hidden;
      transition: 0.5s ease;
    }
    @media (max-width: 1600px) {
      // Credit for math: https://www.madebymike.com.au/writing/precise-control-responsive-typography/
      font-size: calc(14px + (20 - 14) * ((100vw - 428px) / (1600 - 428)));
    }
  }
  input {
    font-size: 1em;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  button {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    font-size: 1em;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: auto;
    max-width: 7em;
  }
  section {
    position: relative;
    text-align: center;
  }
  h1 {
    font-family: 'Neucha';
    font-weight: 400;
    font-style: italic;
    text-decoration: underline;
    text-underline-offset: 0.3em;
    font-size: 3em;
    color: ${({ theme }) => theme.colors.onBackground};
    margin: 0.3em;
    margin-bottom: 1.5em;
  }
  h2 {
    font-family: 'Balsamiq Sans';
    font-weight: 700;
    font-style: normal;
    font-size: 1.5em;
    margin: 0.5em;
  }
`;

export const AppWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  padding: 3em 5em;
  @media (max-width: 768px) {
    padding: 2em;
  }
  @media (max-width: 428px) {
    padding: 0.5em;
  }
`;
