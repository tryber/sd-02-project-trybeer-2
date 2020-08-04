import React, { useEffect } from 'react';
import history from '../../services/history';
import '../../styles/AdminProfile.css';

export default function AdminProfile () {
  const isLoggedIn = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  useEffect(() => {
    console.log(isLoggedIn);

    if(!isLoggedIn) history.push('/login')
  }, [isLoggedIn])

  const { name, email } = isLoggedIn;
  return (
    <div className="admin-profile-header">
      <h1>Perfil</h1>
      <div className="admin-name-field">
        {`Nome: ${name}`}
      </div>
      <div className="admin-email-field">
        {`Email: ${email}`}
      </div>
    </div>
  )
}