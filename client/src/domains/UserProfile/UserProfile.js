import React from 'react';
import FlexContainer from 'components/FlexContainer';
import DeleteUser from './components/DeleteUser';
import { UsernameDisplay } from './UserProfile.styles';
import { useAuthState } from 'context/AuthContext';
import ChangePassword from './components/ChangePassword/ChangePassword';

const UserProfile = () => {
  const { username } = useAuthState();

  return (
    <section>
      <FlexContainer>
        <UsernameDisplay>
          Current user: <span>{username}</span>
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
          <DeleteUser>Delete Account</DeleteUser>
        </FlexContainer>
      </FlexContainer>
    </section>
  );
};

export default UserProfile;
