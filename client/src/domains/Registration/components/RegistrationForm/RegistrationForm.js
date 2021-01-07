import React from 'react';
import AuthForm from 'components/AuthForm';
import FlexContainer from 'components/FlexContainer';
import { useAuthDispatch } from 'context/AuthContext';
import { useAPI } from 'hooks/useAPI';
import { inputPlaceholders } from './RegistrationForm.text';
import { useLanguageContext } from 'context/LanguageContext';
import { useState } from 'react';
import ErrorMessage from 'components/ErrorMessage';

const RegistrationForm = () => {
  const { login } = useAuthDispatch();
  const { currentLanguage } = useLanguageContext();
  const api = useAPI();

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async (formData = {}) => {
    try {
      if (formData.password !== formData.passwordConfirm)
        throw new Error('Passwords do not match');

      await api.signUp({
        username: formData.username,
        password: formData.password,
      });

      const signInData = await api.signIn({
        username: formData.username,
        password: formData.password,
      });

      login({
        userId: signInData.userId,
        username: signInData.username,
      });
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  return (
    <FlexContainer style={{ width: '70%', maxWidth: '30em' }}>
      <ErrorMessage>{errorMessage || api.error?.message || null}</ErrorMessage>
      <AuthForm onSubmit={handleRegistration}>
        <AuthForm.UsernameInput
          disabled={api.isLoading}
          validatorRules={{ hasLength: { min: 3, max: 32 } }}
          required={true}
        />
        <AuthForm.PasswordInput
          id="password"
          disabled={api.isLoading}
          validatorRules={{ hasLength: { min: 4, max: 32 } }}
          required={true}
        />
        <AuthForm.PasswordInput
          name="passwordConfirm"
          placeholder={inputPlaceholders.passwordConfirm[currentLanguage]}
          id="passwordConfirm"
          disabled={api.isLoading}
          validatorRules={{ hasLength: { min: 4, max: 32 } }}
          required={true}
        />
        <AuthForm.SubmitButton disabled={api.isLoading}>
          {inputPlaceholders.submit[currentLanguage]}
        </AuthForm.SubmitButton>
      </AuthForm>
    </FlexContainer>
  );
};

export default RegistrationForm;
