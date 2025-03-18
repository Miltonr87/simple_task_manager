import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';

interface Tarefa {
  id: number;
  nome: string; // Map 'title' from API to 'nome'
  concluida: boolean; // Map 'completed' from API to 'concluida'
}

function ListarTarefas() {
  const ITENS_POR_PAG = 3;

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregarTarefas, setCarregarTarefas] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [ordenar, setOrdenar] = useState<'asc' | 'desc' | 'none'>('none');
  const [ordenarAsc, setOrdenarAsc] = useState<boolean>(false);
  const [ordenarDesc, setOrdenarDesc] = useState<boolean>(false);
  const [filtroTarefa, setFiltroTarefa] = useState<string>('');

  useEffect(() => {
    function obterTarefas() {
      // Fetch tasks from API
      axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5') // API endpoint
        .then((response) => {
          let listaTarefas: Tarefa[] = response.data.map((tarefa: any) => ({
            id: tarefa.id,
            nome: tarefa.title, // Mapping API 'title' to 'nome'
            concluida: tarefa.completed, // Mapping API 'completed' to 'concluida'
          }));

          // Filter tasks
          listaTarefas = listaTarefas.filter(
            (t) =>
              t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
          );

          // Sort tasks
          if (ordenarAsc) {
            listaTarefas.sort((t1, t2) =>
              t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
            );
          } else if (ordenarDesc) {
            listaTarefas.sort((t1, t2) =>
              t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
            );
          }

          // Set total tasks and paginate
          setTotalItems(listaTarefas.length);
          setTarefas(
            listaTarefas.slice(
              (paginaAtual - 1) * ITENS_POR_PAG,
              paginaAtual * ITENS_POR_PAG
            )
          );
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }

    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);

  const handleMudarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
    setCarregarTarefas(true);
  };

  const handleOrdenar = (event: React.MouseEvent) => {
    event.preventDefault();
    if (ordenar === 'none') {
      setOrdenar('asc');
    } else if (ordenar === 'asc') {
      setOrdenar('desc');
    } else {
      setOrdenar('none');
    }
    setCarregarTarefas(true);
  };

  const handleFiltrar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroTarefa(event.target.value);
    setCarregarTarefas(true);
  };

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa &nbsp;
                <Ordenacao ordenar={ordenar} />
              </a>
            </th>
            <th>
              <Link
                to="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Nova tarefa
              </Link>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefa}
                onChange={handleFiltrar}
                data-testid="txt-tarefa"
                className="filtro-tarefa"
              />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={setCarregarTarefas}
          />
        </tbody>
      </Table>
      <Paginacao
        totalItems={totalItems}
        itemsPorPagina={ITENS_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
      />
    </div>
  );
}

export default ListarTarefas;
