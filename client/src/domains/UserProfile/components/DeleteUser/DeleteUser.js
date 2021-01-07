import Button from 'components/Button';
import FlexContainer from 'components/FlexContainer';
import ModalDialog from 'components/ModalDialog';
import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useAuthDispatch } from 'context/AuthContext';
import { useLanguageContext } from 'context/LanguageContext';
import { useAPI } from 'hooks/useAPI';
import { useToggle } from 'hooks/useToggle';

import React from 'react';
import { useEffect } from 'react';
import { DeletionWarning, DeleteUserButton } from './DeleteUser.styles';
import { text } from './DeleteUser.text';

const DeleteUser = ({ children, ...args }) => {
  const { logout } = useAuthDispatch();
  const { deleteUser } = useAPI();
  const { setIsOverlay } = useAppLookDispatch();

  const { currentLanguage } = useLanguageContext();

  const { isOn, toggle } = useToggle(false);

  const handleClick = () => {
    toggle();
  };

  useEffect(() => {
    setIsOverlay(isOn);
    return () => setIsOverlay(false);
  }, [isOn, setIsOverlay]);

  const handleUserDeletion = async () => {
    await deleteUser();

    logout();
  };

  return (
    <>
      {isOn ? (
        <ModalDialog isOpen={isOn} onClose={toggle}>
          <FlexContainer>
            <span style={{ fontSize: '1.5em' }}>
              {text.messages.deletionConfirm[currentLanguage]}
              <br />
              <DeletionWarning>
                {text.messages.deletionWarning[currentLanguage]}
              </DeletionWarning>
            </span>
            <div style={{ marginTop: '5em' }}>
              <DeleteUserButton
                style={{ marginRight: '4em' }}
                onClick={handleUserDeletion}
              >
                {text.buttons.confirmDeletion[currentLanguage]}
              </DeleteUserButton>
              <Button onClick={toggle}>
                {text.buttons.cancelDeletion[currentLanguage]}
              </Button>
            </div>
          </FlexContainer>
        </ModalDialog>
      ) : null}
      <Button onClick={handleClick} {...args}>
        {children}
      </Button>
    </>
  );
};

export default DeleteUser;
