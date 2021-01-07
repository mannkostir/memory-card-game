import React, { useRef } from 'react';
import LanguageSelect from './components/LanguageSelect';
import { navLinks, authLinks } from './Nav.text';
import {
  MainNav,
  NavList,
  NavItem,
  ButtonsWrapper,
  StyledNavLink,
  SignInLink,
  SignUpLink,
} from './Nav.styles';
import { useLanguageContext } from 'context/LanguageContext';
import { useAuthState } from 'context/AuthContext';
import UserDropdown from './components/UserDropdown';
import SettingsDropdown from './components/SettingsDropdown';

const Nav = () => {
  const { isAuthenticated } = useAuthState();
  const { currentLanguage } = useLanguageContext();

  const mainNav = useRef();

  const darkenNav = () => {
    mainNav.current.setAttribute('darken', true);
  };

  const lightenNav = () => {
    mainNav.current.setAttribute('darken', false);
  };

  return (
    <>
      {isAuthenticated ? (
        <MainNav ref={mainNav}>
          <ButtonsWrapper aria-label={'language-select-buttons'}>
            <LanguageSelect />
          </ButtonsWrapper>
          <NavList>
            <NavItem>
              <StyledNavLink to="/game">
                {navLinks.gameLink[currentLanguage]}
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/leaderboard">
                {navLinks.leaderboardLink[currentLanguage]}
              </StyledNavLink>
            </NavItem>
          </NavList>
          <ButtonsWrapper
            style={{
              flexFlow: 'column wrap',
              justifyContent: 'flex-end',
            }}
            aria-label={'dropdown-buttons'}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <UserDropdown style={{ marginRight: '0.5em' }} />
              <SettingsDropdown />
            </div>
          </ButtonsWrapper>
        </MainNav>
      ) : (
        <MainNav ref={mainNav}>
          <ButtonsWrapper aria-label={'language-select-buttons'}>
            <LanguageSelect />
          </ButtonsWrapper>
          <NavList>
            <NavItem>
              <StyledNavLink to="/game">
                {navLinks.gameLink[currentLanguage]}
              </StyledNavLink>
            </NavItem>
            <NavItem>
              <StyledNavLink to="/leaderboard">
                {navLinks.leaderboardLink[currentLanguage]}
              </StyledNavLink>
            </NavItem>
          </NavList>
          <ButtonsWrapper aria-label={'auth-buttons'}>
            <SignUpLink
              id="signUp"
              to="/registration"
              onMouseOver={darkenNav}
              onMouseLeave={lightenNav}
            >
              {authLinks.signUp[currentLanguage]}
            </SignUpLink>
            <SignInLink to="/login">
              {authLinks.signIn[currentLanguage]}
            </SignInLink>
            <SettingsDropdown />
          </ButtonsWrapper>
        </MainNav>
      )}
    </>
  );
};

export default Nav;
