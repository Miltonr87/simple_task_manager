import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import { getCombinedTarefas } from '../api';

interface Tarefa {
  id: number;
  nome: string;
  concluida: boolean;
}

const ListarTarefas: React.FC = () => {
  const ITENS_POR_PAG = 8;

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregarTarefas, setCarregarTarefas] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [ordenar, setOrdenar] = useState<'asc' | 'desc' | 'none'>('none');
  const [filtroTarefa, setFiltroTarefa] = useState<string>('');

  useEffect(() => {
    const obterTarefas = async () => {
      try {
        // Fetch combined tasks (API + localStorage)
        const tarefasCombinadas = await getCombinedTarefas(5);
        let tarefasFiltradas = tarefasCombinadas.filter((t) => {
          return (
            t.nome &&
            t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
          );
        });

        // Sorting based on current order
        if (ordenar === 'asc') {
          tarefasFiltradas.sort((t1, t2) =>
            t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
          );
        } else if (ordenar === 'desc') {
          tarefasFiltradas.sort((t1, t2) =>
            t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
          );
        }

        // Paginate tasks
        setTotalItems(tarefasFiltradas.length);
        setTarefas(
          tarefasFiltradas.slice(
            (paginaAtual - 1) * ITENS_POR_PAG,
            paginaAtual * ITENS_POR_PAG
          )
        );
        console.log('Updated tarefas state:', tarefasFiltradas);
      } catch (error) {
        console.error('Error fetching combined tasks:', error);
      }
    };

    if (carregarTarefas) {
      obterTarefas();
      setCarregarTarefas(false);
    }
  }, [carregarTarefas, paginaAtual, ordenar, filtroTarefa]);

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
    <div className="container py-5">
      {/* Card Wrapper for Tasks */}
      <div className="card shadow-sm border-0 rounded-lg p-4">
        <div className="text-center mb-4">
          <h3>Tarefas a fazer</h3>
        </div>

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
    </div>
  );
};

export default ListarTarefas;
