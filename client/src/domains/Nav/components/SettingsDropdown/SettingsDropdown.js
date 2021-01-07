import React from 'react';
import Dropdown from 'components/Dropdown';
import { StyledLink, StyledToggleIcon } from './SettingsDropdown.styles';
import { useLanguageContext } from 'context/LanguageContext';
import { text } from './SettingsDropdown.text';

const SettingsDropdown = ({ ...args }) => {
  const { currentLanguage } = useLanguageContext();
  return (
    <Dropdown {...args}>
      <Dropdown.ToggleTrigger>
        <StyledToggleIcon className="fas fa-cog" />
      </Dropdown.ToggleTrigger>
      <Dropdown.Content>
        <ul>
          {
            // TO DO: Deal with anchors first
            // Tip: react-router-hash-link
            /* <li>
            <StyledLink to="/settings#AppTheme">
              {text.themeSettingsLink[currentLanguage]}
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/settings#CardsTheme">
              {text.gameSettingsLink[currentLanguage]}
            </StyledLink>
          </li> */
          }
          <li>
            <StyledLink to="/settings">
              {text.allSettingsLink[currentLanguage]}
            </StyledLink>
          </li>
        </ul>
      </Dropdown.Content>
    </Dropdown>
  );
};

export default SettingsDropdown;
