import React from 'react';
import { useAuthDispatch } from 'context/AuthContext';
import AuthForm from 'components/AuthForm';
import FlexContainer from 'components/FlexContainer';
import { useAPI } from 'hooks/useAPI';
import { errors, inputPlaceholders } from './LoginForm.text';
import { useLanguageContext } from 'context/LanguageContext';
import ErrorMessage from 'components/ErrorMessage';

const LoginForm = () => {
  const { login } = useAuthDispatch();
  const api = useAPI();

  const { currentLanguage } = useLanguageContext();

  const handleLogin = async (formData) => {
    try {
      const userData = await api.signIn({
        username: formData.username,
        password: formData.password,
      });

      login({
        userId: userData.userId,
        username: userData.username,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Create interface for that ???

  return (
    <FlexContainer style={{ width: '70%', maxWidth: '30em' }}>
      <AuthForm onSubmit={handleLogin}>
        <ErrorMessage>{api.error?.message}</ErrorMessage>
        <AuthForm.UsernameInput
          disabled={api.isLoading}
          required={true}
          validatorRules={{ hasLength: { min: 3, max: 32 } }}
        />
        <AuthForm.PasswordInput
          disabled={api.isLoading}
          required={true}
          validatorRules={{ hasLength: { min: 4, max: 32 } }}
        />
        <AuthForm.SubmitButton disabled={api.isLoading}>
          {inputPlaceholders.submit[currentLanguage]}
        </AuthForm.SubmitButton>
      </AuthForm>
    </FlexContainer>
  );
};

export default LoginForm;
