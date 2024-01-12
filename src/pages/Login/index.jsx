import React, { useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { Form } from './styled';

export default function index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const errorMessage = (msg) => {
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // verify
    if (!validator.isEmail(email)) errors.push('Email inválido.');
    if (!password) errors.push('Senha inválida.');

    if (errors.length >= 1) {
      errors.forEach((err) => {
        errorMessage(err);
      });
    } else {
      try {
        const loginData = {
          email,
          password,
        };

        const { data } = await axios.post('/tokens', loginData);

        const logData = {
          email,
          token: data.token,
        };

        sessionStorage.setItem('login', JSON.stringify(logData));

        setEmail('');
        setPassword('');
        window.dispatchEvent(new Event('storage'));

        toast.success('Usuário logado.');
        navigate('/');
      } catch (err) {
        const { errors: errorsArray } = err.response.data;
        errorsArray.forEach((msg) => errorMessage(msg));
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>LOGAR CONTA</h2>
      <p>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
      </p>
      <p>
        <label htmlFor="password">Senha:</label>
        <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
      </p>
      <input type="submit" value="ENVIAR" />
    </Form>
  );
}
