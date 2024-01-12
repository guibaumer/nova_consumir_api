import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { Container } from './styled';

export default function index({ userToken, setChildData }) {
  const [alunos, setAlunos] = useState([]);
  const [deletedStudent, setDeletedStudent] = useState('');
  const navigate = useNavigate();

  const errorMessage = (msg) => {
    toast.error(msg);
  };

  useEffect(() => {
    const sessionData = (JSON.parse(sessionStorage.getItem('login')));
    if (sessionData) {
      const { token } = sessionData;
      setChildData(token);
    }

    const getData = async () => {
      try {
        const { data } = await axios.get('/alunos');
        if (data) setAlunos(data);
      } catch (err) {
        errorMessage('Erro ao buscar dados. Tente novamente mais tarde.');
      }
    };
    getData();
  }, [deletedStudent]);

  const handleDelete = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      JSON.stringify(config);
      const deleted = await axios.delete(`/alunos/${id}`, config);
      setDeletedStudent(deleted);
    } catch (err) {
      errorMessage('Erro ao excluir aluno.');
    }
  };

  const handleEdit = async (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <Container>
      <h2>Alunos</h2>
      {alunos && alunos.map((aluno) => (
        <div key={aluno.id}>
          <p>{aluno.nome}</p>
          <p>{aluno.sobrenome}</p>
          <p>{aluno.idade}</p>
          {userToken && (
            <span>
              {/* eslint-disable-next-line */}
              <button type="button" onClick={() => handleDelete(aluno.id)}>
                <FaTrash size="20" />
              </button>
              {/* eslint-disable-next-line */}
              <button type="button">
                <FaPencilAlt size="20" onClick={() => handleEdit(aluno.id)} />
              </button>
            </span>
          ) }

        </div>
      ))}
    </Container>
  );
}
