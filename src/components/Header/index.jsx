import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './styled';

export default function index({ token, setChildData }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logOut = () => {
    sessionStorage.removeItem('login');
    setLoggedIn(false);
    setChildData(null);
  };

  useEffect(() => {
    if (token) setLoggedIn(true);
  }, [token]);

  return (
    <Header>
      <h1><Link to="/">API</Link></h1>
      <ul>
        <li>
          <Link to="/form">Adicionar aluno</Link>
        </li>
        <li>
          {loggedIn ? (
            <button type="button" onClick={logOut}>Sair</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </Header>
  );
}
