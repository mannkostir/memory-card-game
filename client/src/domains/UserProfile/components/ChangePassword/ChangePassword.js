import React from 'react';
import { useToggle } from 'hooks/useToggle';
import Button from 'components/Button';
import AuthForm from 'components/AuthForm';
import ModalDialog from 'components/ModalDialog';
import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useEffect } from 'react';
import { ChangePasswordForm } from './ChangePassword.styles';

const ChangePassword = () => {
  const { isOn, toggle } = useToggle();

  const { setIsOverlay } = useAppLookDispatch();

  const handlePasswordChange = (values) => {
    console.log(values);
  };

  useEffect(() => {
    setIsOverlay(isOn);
  }, [isOn, setIsOverlay]);

  return (
    <>
      {isOn && (
        <ModalDialog isOpen={isOn} onClose={toggle}>
          <ChangePasswordForm onSubmit={handlePasswordChange}>
            <AuthForm.PasswordInput
              name="currentPassword"
              placeholder="Enter your current password"
              validationSettings={{ hasLength: { min: 4 } }}
            />
            <AuthForm.PasswordInput
              name="newPassword"
              placeholder="Enter your new password"
              validationSettings={{ hasLength: { min: 4 } }}
            />
            <AuthForm.SubmitButton>Submit</AuthForm.SubmitButton>
          </ChangePasswordForm>
        </ModalDialog>
      )}
      <Button onClick={toggle}>Change Password</Button>
    </>
  );
};

export default ChangePassword;
