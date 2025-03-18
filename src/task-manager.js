import React from 'react';
import './task-manager.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListarTarefas from './listar/listar-tarefas';
import CadastrarTarefa from './cadastrar/cadastrar-tarefa';
import AtualizarTarefa from './atualizar/atualizar-tarefa';

function TaskManager() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListarTarefas />} />
        <Route path="/cadastrar" element={<CadastrarTarefa />} />
        <Route path="/atualizar/:id" element={<AtualizarTarefa />} />
      </Routes>
    </Router>
  );
}

export default TaskManager;
