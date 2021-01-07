import React from 'react';
import Dropdown from 'components/Dropdown';
import { useAuthContext } from 'context/AuthContext';
import { LogoutOption, StyledLink } from './UserDropdown.styles';
import { useLanguageContext } from 'context/LanguageContext';
import { text } from './UserDropdown.text';

const UserDropdown = ({ ...args }) => {
  const { logout } = useAuthContext();

  const { currentLanguage } = useLanguageContext();

  return (
    <Dropdown {...args}>
      <Dropdown.ToggleTrigger>
        <i className="fas fa-user" />
      </Dropdown.ToggleTrigger>
      <Dropdown.Content>
        <div>
          <StyledLink to={'/history'}>
            {text.historyLink[currentLanguage]}
          </StyledLink>
          <StyledLink to={`/profile`}>
            {text.profileLink[currentLanguage]}
          </StyledLink>
          <LogoutOption onClick={logout}>
            {text.logoutBtn[currentLanguage]}
          </LogoutOption>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default UserDropdown;
