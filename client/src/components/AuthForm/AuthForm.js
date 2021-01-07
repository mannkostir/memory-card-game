import React, { createContext, useState, useContext, useRef } from 'react';
import {
  StyledInput,
  RevealPasswordIcon,
  InputWrapper,
  StyledAuthForm,
} from './AuthForm.styles';
import Button from 'components/Button';
import { useMount } from 'hooks/useMount';
import InputValidator, { inputValidatorRules } from 'utils/InputValidator';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useForm } from 'hooks/useForm';
import { useLanguageContext } from 'context/LanguageContext';
import { inputPlaceholders } from './AuthForm.text';

const AuthFormContext = createContext();

const AuthForm = ({
  children,
  onSubmit = (formValues = {}) => ({}),
  validateInputs = true,
  ...args
}) => {
  const [values, handleChange] = useForm({});

  const [errors, setErrors] = useState({});

  const { currentLanguage } = useLanguageContext();

  const initValidator = (input = {}, validationRules = {}) => {
    const validator = new InputValidator(
      input,
      validationRules,
      {
        onValidationFinish: (errors) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [input.name]: errors,
          }));
        },
      },
      { currentLanguage }
    );

    return validator;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <AuthFormContext.Provider
      value={{
        values,
        handleChange,
        initValidator,
        errors,
        currentLanguage,
      }}
    >
      <StyledAuthForm
        onSubmit={handleSubmit}
        aria-label="Authentication form"
        {...args}
      >
        {children}
      </StyledAuthForm>
    </AuthFormContext.Provider>
  );
};

const FormTitle = ({ children, style, ...args }) => {
  return (
    <h2 aria-label="Form title" style={style} {...args}>
      {children}
    </h2>
  );
};

const UsernameInput = ({
  onChange = (e) => {},
  validatorRules = inputValidatorRules,
  onBlur = (e) => {},
  ...args
}) => {
  const { handleChange, initValidator, errors, currentLanguage } = useContext(
    AuthFormContext
  );
  const [validator, setValidator] = useState(null);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const usernameInput = useRef();

  useEffect(() => {
    setValidator(initValidator(usernameInput.current, validatorRules));
  }, [validatorRules]);

  useEffect(() => {
    setValidationErrorMessage(errors[usernameInput.current.name]?.[0]?.message);
  }, [errors]);

  return (
    <InputWrapper>
      <StyledInput
        type="text"
        name="username"
        aria-label="username"
        placeholder={inputPlaceholders.username[currentLanguage]}
        ref={usernameInput}
        onBlur={(e) => {
          onBlur(e);
          validator.validate();
        }}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        {...args}
      />
      {validationErrorMessage && (
        <span
          style={{
            position: 'absolute',
            bottom: '-0.7em',
            transform: 'translateY(100%)',
            right: '0',
            left: '0',
            margin: 'auto',
          }}
        >
          {validationErrorMessage}
        </span>
      )}
    </InputWrapper>
  );
};

const EmailInput = ({
  onBlur = (e) => {},
  onChange = (e) => {},
  validatorRules = inputValidatorRules,
  ...args
}) => {
  const { handleChange, initValidator, errors, currentLanguage } = useContext(
    AuthFormContext
  );

  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const emailInput = useRef();

  const validator = useMemo(() => {
    initValidator(emailInput.current, validatorRules);
  }, [initValidator, validatorRules]);

  useEffect(() => {
    setValidationErrorMessage(errors[emailInput.current.name]?.[0]?.message);
  }, [errors]);

  return (
    <InputWrapper>
      <StyledInput
        type="email"
        name="email"
        aria-label="email"
        placeholder={inputPlaceholders.email[currentLanguage]}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        onBlur={(e) => {
          onBlur(e);
          validator.validate();
        }}
        {...args}
      />
      {validationErrorMessage && (
        <span
          style={{
            position: 'absolute',
            bottom: '-0.7em',
            transform: 'translateY(100%)',
            right: '0',
            left: '0',
            margin: 'auto',
          }}
        >
          {validationErrorMessage}
        </span>
      )}
    </InputWrapper>
  );
};

const PasswordInput = ({
  style = {},
  icon = 'See',
  onBlur = (e) => {},
  onChange = (e) => {},
  validatorRules = inputValidatorRules,
  ...args
}) => {
  const { handleChange, initValidator, errors, currentLanguage } = useContext(
    AuthFormContext
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [id, setId] = useState(null);

  const [validator, setValidator] = useState(null);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const passwordField = useRef();

  useMount(() => {
    setValidator(initValidator(passwordField.current, validatorRules));
  });

  useMount(() => {
    const id = passwordField.current.id || null;
    setId(id);
  });

  useEffect(() => {
    setValidationErrorMessage(errors[passwordField.current.name]?.[0]?.message);
  }, [errors]);

  const revealPassword = () => {
    passwordField.current.type = 'text';
    setIsPasswordVisible(true);
  };

  const hidePassword = () => {
    passwordField.current.type = 'password';
    setIsPasswordVisible(false);
  };

  const togglePasswordVisibility = () => {
    const type = passwordField.current.type;

    type === 'password' ? revealPassword() : hidePassword();
  };

  return (
    <InputWrapper style={{ ...style }}>
      <StyledInput
        type="password"
        name="password"
        aria-label="password"
        placeholder={inputPlaceholders.password[currentLanguage]}
        onChange={(e) => {
          handleChange(e);
          onChange(e);
        }}
        ref={passwordField}
        onBlur={(e) => {
          onBlur(e);
          validator.validate();
        }}
        {...args}
        role="password"
      />
      <RevealPasswordIcon onClick={togglePasswordVisibility} htmlFor={id}>
        {isPasswordVisible ? (
          <i className="fas fa-eye-slash" />
        ) : (
          <i className="fas fa-eye" />
        )}
      </RevealPasswordIcon>
      {validationErrorMessage && (
        <span
          style={{
            position: 'absolute',
            bottom: '-0.7em',
            transform: 'translateY(100%)',
            right: '0',
            left: '0',
            margin: 'auto',
          }}
        >
          {validationErrorMessage}
        </span>
      )}
    </InputWrapper>
  );
};

const SubmitButton = ({ children, disabled, ...args }) => {
  const { errors } = useContext(AuthFormContext);

  const [isAllInputsValid, setIsAllInputsValid] = useState(false);

  useEffect(() => {
    setIsAllInputsValid(!Object.values(errors).flat().length);
  }, [errors]);
  return (
    <Button type="submit" {...args} disabled={!isAllInputsValid}>
      {children}
    </Button>
  );
};

AuthForm.FormTitle = FormTitle;
AuthForm.UsernameInput = UsernameInput;
AuthForm.EmailInput = EmailInput;
AuthForm.PasswordInput = PasswordInput;
AuthForm.SubmitButton = SubmitButton;

export default AuthForm;
