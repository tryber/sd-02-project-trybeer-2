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
    const passInput = queryByTestId('password-input');
    expect(emailInput).not.toBeInTheDocument();
    expect(passInput).toBeInTheDocument();

  })
})