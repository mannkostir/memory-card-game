import React from 'react';
import AuthForm from './AuthForm';
import FormTests from 'utils/componentTesting/FormTests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

// const formTests = new FormTests(AuthForm);

// describe('AuthForm', () => {
//   formTests.submitForm();
// });

describe('AuthForm', () => {
  test('submits data', () => {
    let data = {};

    const { getByRole } = render(
      <AuthForm onSubmit={(values) => (data = values)}>
        <AuthForm.UsernameInput></AuthForm.UsernameInput>
        <AuthForm.EmailInput></AuthForm.EmailInput>
        <AuthForm.PasswordInput></AuthForm.PasswordInput>
        <AuthForm.SubmitButton></AuthForm.SubmitButton>
      </AuthForm>
    );

    const form = getByRole('form', { name: /authentication form/i });

    expect(form).toBeInTheDocument();

    const usernameInput = getByRole('textbox', { name: 'username' });
    const emailInput = getByRole('textbox', { name: 'email' });
    const passwordInput = getByRole('password', {
      type: 'password',
      name: 'password',
    });
    const submitBtn = getByRole('button', { type: 'submit' });

    const username = 'testUser';
    const email = 'test@abc.com';
    const password = 'testPassword';

    userEvent.type(usernameInput, username);
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    userEvent.click(submitBtn);

    expect(data).toHaveProperty('username', username);
    expect(data).toHaveProperty('email', email);
    expect(data).toHaveProperty('password', password);
  });
});
