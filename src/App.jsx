import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Alunos from './pages/Alunos';
import Login from './pages/Login';
import Form from './components/Form';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // just to me remember: childData state is the token. Login sets it.
  const [childData, setChildData] = useState(null);

  return (
    <div className="App">
      <ToastContainer />
      <Header token={childData} setChildData={setChildData} />

      <Routes>
        <Route path="/" element={<Alunos userToken={childData} setChildData={setChildData} />} />
        <Route path="/form/:id?" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
