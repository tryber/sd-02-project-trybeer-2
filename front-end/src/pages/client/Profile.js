import React, { useEffect, useState } from 'react';
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

const sendRequestNewName = (newUser) => {
  console.log(newUser);
};

const Profile = () => {
  const [user, setUser] = useState('');
  const [initialUser, setInitialUser] = useState('');
  const disabled = user.name === initialUser.name;
  useEffect(() => {
    const isLSExist = verifyLocalStorage();
    if (isLSExist) {
      setUser(isLSExist);
      setInitialUser(isLSExist);
    };
  }, [setUser]);

  return (
    <div className="profile-container">
      <div className="profile-top-container">
        {emailAndNameInputs('text', 'name', user.name || '', setUser, 'profile-name-input')}
        {emailAndNameInputs('text', 'email', user.email || '', setUser, 'profile-email-input')}
      </div>
      <div className="profile-bot-container">
        <button
          type="button"
          data-testid="profile-save-btn"
          disabled={disabled}
          onClick={() => sendRequestNewName(user)}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default Profile;
