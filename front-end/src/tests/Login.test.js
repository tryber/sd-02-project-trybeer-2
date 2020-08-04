import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import history from '../services/history';
import Provider from '../context/TrybeerContext';
import Login from '../pages/Login';

describe('Testing Login Page', () => {
  test('Testing if HTML elements appears', () => {
    const { queryByTestId } = render(
      <Login />
    );
    const emailInput = queryByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passInput = queryByTestId('password-input');
    expect(passInput).toBeInTheDocument();
    const signInButton = queryByTestId('signin-btn');
    expect(signInButton).toBeInTheDocument();
    const noAccountButton = queryByTestId('no-account-btn');
    expect(noAccountButton).toBeInTheDocument();
  });

  test('Testing funcionality of HTML elements', () => {
    const { queryByTestId } = render(
      <Login />
    );
    
    const emailInput = queryByTestId('email-input');
    const passInput = queryByTestId('password-input');
    const signInButton = queryByTestId('signin-btn');

    expect(emailInput.value).toBe('');
    expect(passInput.value).toBe('');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'trybe@.email.com' } });
    expect(emailInput.value).toBe('trybe@.email.com');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(passInput, { target: { value: '12345' } });
    expect(passInput.value).toBe('12345');
    expect(signInButton.disabled).toBeTruthy();
    fireEvent.change(emailInput, { target: { value: 'trybe@email.com' } });
    fireEvent.change(passInput, { target: { value: '123456' } });
    expect(emailInput.value).toBe('trybe@email.com');
    expect(passInput.value).toBe('123456');
    expect(signInButton.disabled).toBeFalsy();
  });

  test('Testing new user button', async () => {
    const { queryByTestId } = render(
      <Login />
    );
    
  });
});
