import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, wait, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import history from '../services/history';
import Register from '../pages/RegisterPage';
import Provider from '../context/TrybeerContext';
import axios from 'axios';

jest.mock('axios');

describe('Testing Register Page', () => {
  test('Testing if HTML elements appears', () => {
    const { queryByTestId } = render(
      <Register />
    );

    const nameInput = queryByTestId('signup-name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toBe('');
    const emailInput = queryByTestId('signup-email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.value).toBe('');
    const passInput = queryByTestId('signup-password');
    expect(passInput).toBeInTheDocument();
    expect(passInput.value).toBe('');
    const sellInput = queryByTestId('signup-seller');
    expect(sellInput).toBeInTheDocument();
    expect(sellInput.checked).toBeFalsy();
    const signInButton = queryByTestId('signup-btn');
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.disabled).toBeTruthy();
  });

  test('Testing funcionality of HTML elements', async () => {
    const { queryByTestId } = render(
      <Provider>
        <Register />
      </Provider>
    );

    const nameInput = queryByTestId('signup-name');
    const emailInput = queryByTestId('signup-email');
    const passInput = queryByTestId('signup-password');
    const signInButton = queryByTestId('signup-btn');

    fireEvent.change(nameInput, { target: { value: 'Felipe' } });
    expect(nameInput.value).toBe('Felipe');
    fireEvent.change(emailInput, { target: { value: "lipe@.lipe.com" } });
    await wait();
    expect(emailInput.value).not.toBe('lipe@.lipe.com');


  })
});
