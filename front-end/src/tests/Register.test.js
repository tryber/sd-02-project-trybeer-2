import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from '../services/history';
import Register from '../pages/RegisterPage';
import axios from 'axios';

jest.mock('axios');

describe('Testing Register Page', () => {
  test('Testing if HTML elements appears', () => {
    const { queryByTestId } = render(
      <Register />
    );

    const nameInput = queryByTestId('signup-name');
    expect(nameInput).toBeInTheDocument();
    const emailInput = queryByTestId('signup-email');
    expect(emailInput).toBeInTheDocument();
    const passInput = queryByTestId('signup-password');
    expect(passInput).toBeInTheDocument();
    const sellInput = queryByTestId('signup-seller');
    expect(sellInput).toBeInTheDocument();
    expect(sellInput.checked).toBeFalsy();
    const signInButton = queryByTestId('signup-btn');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.disabled).toBeTruthy();
  })
});
