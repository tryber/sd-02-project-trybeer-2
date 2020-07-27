import React, { useContext, useEffect, useState } from 'react';
import history from '../services/history';
import axios from 'axios';


const LoginScreen = () => {
  const [emailData, setEmailData] = useState('');
  const [passData, setPassData] = useState('');
  const [isEmailGood, setIsEmailGood] = useState(false);
  const [isPasswordGood, setIsPasswordGood] = useState(false);

  const sendLoginRequest = async (email, password) => {
    const loginData = await axios({
      baseURL: `http://localhost:3001/login`,
      method: 'post',
      data: {
        email,
        password
      },
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
    .catch((err) => console.log(err) );

    return loginRedirect(loginData);
  }

  const loginRedirect = ({ data: { name, email, token, role } }) => {
    localStorage.setItem('user', JSON.stringify({ name, email, token, role }));
    if (role === 'administrator') return history.push('/admin/home');
    return history.push('/client/home');
  }


  const formValidation = (type, value) => {
    if(type === 'password') {
      setPassData(value)
      value.length >= 6 ? setIsPasswordGood(true) : setIsPasswordGood(false);
    }
    if(type === 'email') {
      setEmailData(value)
      const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isMailValid = value.match(mailRegex);
      isMailValid !== null ? setIsEmailGood(true) : setIsEmailGood(false);
    }
  }

  const interactiveFormField = (formName, type) => (
    <label htmlFor={formName}>
      <input
        type={type}
        id={formName}
        data-testid={formName}
        onChange={(e) => formValidation(type, e.target.value)  }/>
    </label>
  );

  return (
    <div className="login-page">
      <div className="form-container">
        <form className="login-form">
          {interactiveFormField('email-input', 'email')}
          {interactiveFormField('password-input', 'password')}
          <button
            disabled={!(isEmailGood && isPasswordGood)}
            onClick={(e) => {
              e.preventDefault();
              sendLoginRequest(emailData, passData)}}>
                ENTRAR
          </button>
        </form>
      </div>
      <div className="no-account-btn-container">
        <button
          data-testid="no-account-btn"
          className="no-account-btn"
          onClick={() => history.push('/register')}>
          Ainda não tenho conta
        </button>
      </div>
    </div>
  )
}

export default LoginScreen;