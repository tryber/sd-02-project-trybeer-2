import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';


const LoginScreen = () => {
  const [emailData, setEmailData] = useState('');
  const [passData, setPassData] = useState('');

  const sendLoginRequest = async (email, password) => {
    console.log(email, password)
    const loginData = await axios.post(`http://localhost:3001/login`, {
      email,
      password,
    })
    .catch((err) => console.log(err) );
    ;
  }

  const interactiveFormField = (formName, type) => (
    <label htmlFor={formName}>
      <input
        type={type}
        id={formName}
        data-testid={formName}
        onChange={(e) => {
          if(type === 'password') setPassData(e.target.value)
          if(type === 'email') setEmailData(e.target.value)
        } }/>
    </label>
  );

  return (
    <div className="login-page">
      <div className="form-container">
        <form className="login-form">
          {interactiveFormField('email-input', 'email')}
          {interactiveFormField('password-input', 'password')}
          <button onClick={(e) => {
            e.preventDefault();
            sendLoginRequest(emailData, passData)}}>ENTRAR</button>
        </form>
      </div>
      <div className="no-account-btn-container">
        <button data-testid="no-account-btn" className="no-account-btn">
          Ainda não tenho conta
        </button>
      </div>
    </div>
  )
}

export default LoginScreen;