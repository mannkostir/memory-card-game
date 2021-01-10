import React from 'react';
import FlexContainer from 'components/FlexContainer';
import DeleteUser from './components/DeleteUser';
import { UsernameDisplay } from './UserProfile.styles';
import { useAuthState } from 'context/AuthContext';
import ChangePassword from './components/ChangePassword/ChangePassword';
import * as text from './UserProfile.text';
import { useLanguageContext } from 'context/LanguageContext';

const UserProfile = () => {
  const { username } = useAuthState();

  const { currentLanguage } = useLanguageContext();

  return (
    <section>
      <FlexContainer>
        <UsernameDisplay>
          {text.headings.main[currentLanguage]}: <span>{username}</span>
        </UsernameDisplay>
        <FlexContainer
          style={{
            gap: '4em',
          }}
        >
          {
            // TO DO: finish password_change request first
            /* <ChangePassword /> */
          }
          <DeleteUser>{text.buttons.deleteUser[currentLanguage]}</DeleteUser>
        </FlexContainer>
      </FlexContainer>
    </section>
  );
};

export default UserProfile;
