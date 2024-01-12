import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../services/axios';
import { Form } from './styled';

export default function index() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  const setStates = async (studentId) => {
    const { data } = await axios.get(`alunos/${studentId}`);

    setName(data.nome);
    setLastName(data.sobrenome);
    setAge(data.idade);
    setHeight(String(data.altura));
    setWeight(String(data.peso));
    setEmail(data.email);
    setEdit(true);
  };

  useEffect(() => {
    if (id) setStates(id);
  }, []);

  const navigate = useNavigate();

  const errorMessage = (msg) => {
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // verify
    if (name.length < 3 || name.length > 255) errors.push('Nome deve ter entre 3 e 255 caracteres.');
    if (lastName.length < 3 || lastName.length > 255) errors.push('Sobrenome deve ter entre 3 e 255 caracteres.');
    if (!validator.isEmail(email)) errors.push('Email inválido.');
    if (!validator.isInt(String(age))) errors.push('Idade deve ser um valor inteiro.');
    if (!validator.isInt(weight) && !validator.isFloat(weight)) errors.push('Peso deve ser um valor inteiro ou de ponto flutuante.');
    if (!validator.isInt(height) && !validator.isFloat(height)) errors.push('Altura deve ser um valor inteiro ou de ponto flutuante.');

    if (errors.length >= 1) {
      errors.forEach((err) => {
        errorMessage(err);
      });
    } else {
      const student = {
        nome: name,
        sobrenome: lastName,
        idade: age,
        altura: height,
        peso: weight,
        email,
      };

      try {
        if (edit) {
          const { token } = JSON.parse(sessionStorage.getItem('login'));
          console.log(token);
          const config = { headers: { Authorization: `Bearer ${token}` } };
          JSON.stringify(config);
          await axios.put(`/alunos/${id}`, student, config);
          toast.success('Aluno editado');
        } else {
          await axios.post('/alunos', student);
          toast.success('Aluno criado.');
        }

        setName('');
        setLastName('');
        setAge('');
        setHeight('');
        setWeight('');
        setEmail('');

        navigate('/');
      } catch (err) {
        console.log(err);
        const { errors: errorsArray } = err.response.data;
        errorsArray.forEach((msg) => errorMessage(msg));
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>CADASTRAR ALUNO</h2>
      <p>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name} />
      </p>
      <p>
        <label htmlFor="lastname">Sobrenome:</label>
        <input type="text" id="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
      </p>
      <p>
        <label htmlFor="age">Idade:</label>
        <input type="number" id="age" onChange={(e) => setAge(e.target.value)} value={age} />
      </p>
      <p>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </p>
      <p>
        <label htmlFor="height">Altura:</label>
        <input type="text" id="height" onChange={(e) => setHeight(e.target.value)} value={height} />
      </p>
      <p>
        <label htmlFor="weight">Peso:</label>
        <input type="text" id="weight" onChange={(e) => setWeight(e.target.value)} value={weight} />
      </p>
      <input type="submit" value="ENVIAR" />
    </Form>
  );
}
