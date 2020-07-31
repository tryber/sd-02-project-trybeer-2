import React, { useEffect, useState } from 'react';
import history from '../../services/history';
import axios from 'axios';
import '../../style/Profile.css';

const verifyLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const emailAndNameInputs = (type, text, value, setValue, testId) => (
  <label htmlFor={text} className={`${text}-label`}>
    {text}
    <br />
    <input
      readOnly={(text === 'email') || false}
      type={type}
      name={text}
      value={value}
      data-testid={testId}
      onChange={({ target }) => setValue((prev) => ({ ...prev, name: target.value }))}
    />
  </label>
);

const saveBtn = (disabled, user, setError) => (
  <button
    type="button"
    data-testid="profile-save-btn"
    disabled={disabled}
    onClick={() => sendRequestNewName(user, setError)}
  >
    Salvar
  </button>
);

const sendRequestNewName = async (newUser, setErrorStatus) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  if (!token) {
    history.push('/login');
  };
  const resp = await axios({
    baseURL: 'http://localhost:3001/users/me',
    method: 'patch',
    data: { name: newUser.name },
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }
  })
    .catch(({ response: { status, data: { error: { message } } } }) => setErrorStatus(`Error: ${status}. ${message}`));
  if (resp) {
    localStorage.setItem('user', JSON.stringify(newUser));
    setErrorStatus(`Atualização concluída com sucesso`);
  };
};

const Profile = () => {
  const [user, setUser] = useState('');
  const [initialUser, setInitialUser] = useState('');
  const [error, setError] = useState('');
  const disabled = user.name === initialUser.name;
  useEffect(() => {
    const isLSExist = verifyLocalStorage();
    if (isLSExist) {
      setUser(isLSExist);
      setInitialUser(isLSExist);
    }
    if (!isLSExist || !isLSExist.token) history.push('/login');
  }, [setUser]);
  if (error.match(/expired/i)) history.push('/login');
  return (
    <div className="profile-container">
      {(error) || <h2>{error}</h2>}
      <div className="profile-top-container">
        {emailAndNameInputs('text', 'name', user.name || '', setUser, 'profile-name-input')}
        {emailAndNameInputs('text', 'email', user.email || '', setUser, 'profile-email-input')}
      </div>
      <div className="profile-bot-container">
        {saveBtn(disabled, user, setError)}
      </div>
    </div>
  );
};

export default Profile;
