import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import history from '../services/history';
import Provider from '../context/TrybeerContext';
import Login from '../pages/Login';

describe('Testing Login Page', () => {
  test('Testing if HTML elements appears', async () => {
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

  })
})
