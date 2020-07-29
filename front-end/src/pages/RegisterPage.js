import React, { useState } from 'react';
import history from '../services/history';
import axios from 'axios';

import '../style/RegisterPage.css';

const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const textAndCheckboxInputs = (type, text, valueOrChecked, setValue, testId, role) => (
  <label htmlFor={text} className={`label-${text}`}>
    {text}
    <br />
    <input
      type={type}
      name={text}
      value={valueOrChecked[role]}
      checked={valueOrChecked[role]}
      data-testid={testId}
      onChange={
        (type !== 'checkbox')
          ? ({ target }) => setValue((prev) => ({ ...prev, [role]: target.value }))
          : ({ target }) => setValue((prev) => ({ ...prev, [role]: target.checked }))}
    />
  </label>
);

const sendLoginRequest = async (email, password, setErrorMessage) => {
  const loginData = await axios({
    baseURL: `http://localhost:3001/login`,
    method: 'post',
    data: {
      email,
      password
    },
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  })
    .catch(({ response: { data: { error } } }) => setErrorMessage(error));

  if (loginData) addLocalStorage(loginData);

  return loginData ? registerRedirect(loginData) : null;
};

const addLocalStorage = ({ name, email, token, role }) => {
  localStorage.setItem('user', JSON.stringify({ name, email, token, role }));
};

const requestRegister = async ({ nameData, emailData, passData, sellerData }, setSuccessOrError) => {
  const role = (sellerData) ? 'true' : 'false';
  const resp = await axios.post('http://localhost:3001/register',
    {
      name: nameData,
      email: emailData,
      password: passData,
      role,
    })
    .catch((err) => setSuccessOrError(err.response.data.error));

  if (resp) return await sendLoginRequest(emailData, passData, setSuccessOrError)
};

const registerRedirect = (role) => (
  role === 'client'
    ? history.push('/client/products')
    : history.push('/admin/home')
);

const verifyValues = (inputsData) => {
  if (!inputsData.nameData || inputsData.nameData.length < 12 || typeof inputsData.nameData !== 'string') {
    return { error: 'name' }
  };
  if (!inputsData.passData || inputsData.passData.length < 6 || isNaN(inputsData.passData)) {
    return { error: 'pass' }
  };
  if (!inputsData.emailData.match(MAIL_REGEX)) {
    return { error: 'email' }
  }
  return true;
};

const clearFields = (setInputsData) => {
  setInputsData({
    emailData: '',
    passData: '',
    nameData: '',
    sellerData: false
  });
};

const handleSubmit = async (event, inputsData, setInputsData, setSuccessOrError) => {
  const isValid = verifyValues(inputsData);
  if (isValid.error === 'name') {
    alert('O nome deve possuir 12 caracteres e sem caracteres especiais');
    setInputsData((prev) => ({ ...prev, nameData: '' }));
    return event.preventDefault();
  }
  if (isValid.error === 'pass') {
    alert('A senha deve conter ao menos 6 números');
    setInputsData((prev) => ({ ...prev, passData: '' }));
    return event.preventDefault();
  }
  if (isValid.error === 'email') {
    alert('Formato de Email invalido');
    setInputsData((prev) => ({ ...prev, emailData: '' }));
    return event.preventDefault();
  }
  clearFields(setInputsData);
  requestRegister(inputsData, setSuccessOrError);
  event.preventDefault();
};

const RegisterPage = () => {
  const [successOrError, setSuccessOrError] = useState('');
  const [inputsData, setInputsData] = useState({
    emailData: '',
    passData: '',
    nameData: '',
    sellerData: false,
  });

  const disabled = verifyValues(inputsData);

  return (
    <div className="register-page-container">
      {(successOrError === '') || <h2>{`Error: ${successOrError.message}`}</h2>}
      <form
        className="register-form-container"
        onSubmit={(e) => handleSubmit(e, inputsData, setInputsData, setSuccessOrError)}
      >
        {textAndCheckboxInputs('text', 'Nome', inputsData, setInputsData, "signup-name", 'nameData')}
        {textAndCheckboxInputs('text', 'Email', inputsData, setInputsData, "signup-email", 'emailData')}
        {textAndCheckboxInputs('password', 'Password', inputsData, setInputsData, "signup-password", 'passData')}
        {textAndCheckboxInputs(
          'checkbox', 'Quero Vender', inputsData, setInputsData, "signup-seller", 'sellerData',
        )}
        <input type="submit" value="Cadastrar" data-testid="signup-btn" disabled={disabled.error} />
      </form>
    </div>
  );
};

export default RegisterPage;
