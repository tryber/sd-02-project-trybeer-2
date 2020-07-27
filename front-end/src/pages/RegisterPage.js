import React, { useState, useEffect } from 'react';
import axios from 'axios';

const textInputs = (type, text, value, setValue) => (
  <label htmlFor={text}>
    {text}
    <input type={type} name={text} value={value} onChange={(e) => setValue(e.target.value)} />
  </label>
);

const checkBox = (type, text, checked, setValue) => (
  <label htmlFor={text}>
    {text}
    <input type={type} name={text} checked={checked} onChange={(e) => setValue(e.target.checked)} />
  </label>
);

const requestRegister = async (name, email, password, role) => {
  console.log(name, email, password, role);
  const resp = await axios.post('http://localhost:3001/register', { name, email, password, role })
    .catch((err) => console.log(err));
  console.log(resp);
};

const RegisterPage = () => {
  const [emailData, setEmailData] = useState('');
  const [passData, setPassData] = useState('');
  const [nameData, setNameData] = useState('');
  const [sellerData, setSellerData] = useState(false);

  const handleSubmit = (event) => {
    setNameData('');
    setPassData('');
    setEmailData('');
    setSellerData(false);
    requestRegister(nameData, emailData, passData, sellerData);
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {textInputs('text', 'Nome', nameData, setNameData)}
        {textInputs('email', 'Email', emailData, setEmailData)}
        {textInputs('password', 'Password', passData, setPassData)}
        {checkBox('checkbox', 'Quero Vender', sellerData, setSellerData)}
        <input type="submit" value="Cadastrar" />
      </form>
    </div>
  );
};

export default RegisterPage;
