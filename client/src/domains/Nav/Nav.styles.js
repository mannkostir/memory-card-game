import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const MainNav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  position: relative;
  /* min-height: 10em; */
  justify-content: space-around;
  align-items: center;
  transition: 0.1s ease-in;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  background: transparent;
  font-family: 'Neucha';
  @media (max-width: 1024px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: auto 1fr;
  }
  @media (max-width: 768px) {
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  @media (max-width: 1024px) {
    grid-column: 1/3;
    grid-row: 2;
    padding-top: 2em;
  }
  @media (max-width: 768px) {
    grid-row: 3;
  }
`;

export const NavItem = styled.li`
  display: flex;
  margin-right: 1em;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 2em;
  width: auto;
  @media (max-width: 1024px) {
    grid-row: 1;
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    grid-row: 2;
    justify-content: center;
    &[aria-label='language-select-buttons'] {
      justify-content: start;
      grid-row: 1;
    }
  }
  @media (max-width: 428px) {
    flex-direction: column;
    gap: 1.5em;
  }
`;

export const StyledNavLink = styled(Link)`
  display: block;
  line-height: 2.5em;
  padding: 0 0.5em;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.onBackground};
  font-size: 1.5em;
  border-radius: 10px;
  opacity: 0.8;
  :hover {
    color: ${({ theme }) => theme.colors.onBackground};
    opacity: 1;
  }
  ::after {
    content: '';
    visibility: hidden;
    position: absolute;
    bottom: 0.3em;
    left: 50%;
    height: 0.2em;
    width: 0;
    background-color: ${({ theme }) => theme.colors.onBackground};
    transition: 0.3s ease-in-out;
  }
  :hover::after {
    left: 0;
    right: 0;
    visibility: visible;
    width: 100%;
  }
`;

export const SignInLink = styled(Link)`
  text-decoration: none;
  padding: 0.5em;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary.light};
  margin-right: 2em;
  :hover {
    text-decoration: underline;
  }
  @media (max-width: 428px) {
    margin: 0;
  }
`;

export const SignUpLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: 0.5em;
  border-radius: 10px;
  margin-right: 1em;
  transition: 0.2s ease-in-out;
  :hover {
    color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0px 0px 10px 10px ${({ theme }) => theme.colors.primary.light};
  }
  @media (max-width: 428px) {
    margin: 0;
  }
`;
