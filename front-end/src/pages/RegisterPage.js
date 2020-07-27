import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/RegisterPage.css';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const textInputs = (type, text, value, setValue, testId) => (
  <label htmlFor={text}>
    {text}
    <input type={type}
      name={text}
      value={value}
      data-testid={testId}
      onChange={(e) => setValue(e.target.value)} />
  </label>
);

const checkBox = (type, text, checked, setValue, testId) => (
  <label htmlFor={text}>
    {text}
    <input
      type={type}
      name={text}
      checked={checked}
      data-testid={testId}
      onChange={(e) => setValue(e.target.checked)} />
  </label>
);

const requestRegister = async (name, email, password, role) => {
  const resp = await axios.post('http://localhost:3001/register', { name, email, password, role })
    .catch((err) => console.log(err));
  console.log(resp);
};

const verifyValues = (name, password, email) => {
  if (!name || name.length <= 12 || typeof name !== 'string') {
    return { error: 'name' }
  };
  if (!password || password.length <= 6) {
    return { error: 'pass' }
  };
  if (!email.match(emailRegex)) {
    return { error: 'email' }
  }
  return true;
};

const clearFields = (setNameData, setEmailData, setPassData, setSellerData) => {
  setNameData('');
  setPassData('');
  setEmailData('');
  setSellerData(false);
};

const handleSubmit = (
  event, nameData, passData, emailData, setNameData, setEmailData, setPassData, setSellerData,
) => {
  const isValid = verifyValues(nameData, passData, emailData);
  if (isValid.error === 'name') {
    alert('O nome deve possuir 12 caracteres e sem caracteres especiais');
    setNameData('');
    return event.preventDefault();
  }
  if (isValid.error === 'pass') {
    alert('A senha deve conter ao menos 6 números');
    setPassData('');
    return event.preventDefault();
  }
  if (isValid.error === 'email') {
    alert('Formato de Email invalido');
    setEmailData('');
    return event.preventDefault();
  }
  clearFields(setNameData, setEmailData, setPassData, setSellerData);
  requestRegister(nameData, emailData, passData, sellerData);
  event.preventDefault();
};

const RegisterPage = () => {
  const [emailData, setEmailData] = useState('');
  const [passData, setPassData] = useState('');
  const [nameData, setNameData] = useState('');
  const [sellerData, setSellerData] = useState(false);


  const disabled = verifyValues(nameData, passData, emailData);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(
        event, nameData, passData, emailData, setNameData, setEmailData, setPassData, setSellerData,
      )}>
        {textInputs('text', 'Nome', nameData, setNameData, "signup-name")}
        {textInputs('text', 'Email', emailData, setEmailData, "signup-email")}
        {textInputs('number', 'Password', passData, setPassData, "signup-password")}
        {checkBox('checkbox', 'Quero Vender', sellerData, setSellerData, "signup-seller")}
        <input type="submit" value="Cadastrar" data-testid="signup-btn" disabled={disabled.error} />
      </form>
    </div>
  );
};

export default RegisterPage;
