import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ConcluirTarefa from './concluir-tarefa';
import RemoverTarefa from './remover-tarefa';
import axios from 'axios';

interface Tarefa {
  id: number;
  nome: string; // Map 'title' from API to 'nome'
  concluida: boolean; // Map 'completed' from API to 'concluida'
}

interface ItensListaTarefasProps {
  tarefas: Tarefa[];
  recarregarTarefas: (recarregar: boolean) => void;
}

const ItensListaTarefas: React.FC<ItensListaTarefasProps> = ({
  tarefas,
  recarregarTarefas,
}) => {
  const marcarConcluida = (tarefa: Tarefa): string => {
    return tarefa.concluida ? 'line-through' : 'none';
  };

  return (
    <>
      {tarefas.map((tarefa) => (
        <tr key={tarefa.id} data-testid="tarefa">
          <td
            width="75%"
            data-testid="nome-tarefa"
            style={{ textDecoration: marcarConcluida(tarefa) }}
          >
            {tarefa.nome} {/* Display 'nome' instead of 'title' */}
          </td>
          <td className="text-right">
            <ConcluirTarefa
              tarefa={tarefa}
              recarregarTarefas={recarregarTarefas}
              className={tarefa.concluida ? 'hidden' : undefined}
            />
            &nbsp;
            <Link
              to={`/atualizar/${tarefa.id}`}
              className={tarefa.concluida ? 'hidden' : 'btn btn-warning btn-sm'}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            &nbsp;
            <RemoverTarefa
              tarefa={tarefa}
              recarregarTarefas={recarregarTarefas}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

const ListarTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => {
        // Map the API response to match your interface
        const tarefasMapeadas = response.data.map((tarefa: any) => ({
          id: tarefa.id,
          nome: tarefa.title, // Mapping API 'title' to 'nome'
          concluida: tarefa.completed, // Mapping API 'completed' to 'concluida'
        }));
        setTarefas(tarefasMapeadas); // Store the mapped tasks in state
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []); // Empty dependency array to run only on mount

  return (
    <table>
      <thead>
        <tr>
          <th>Nome da Tarefa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <ItensListaTarefas
          tarefas={tarefas} // Passing tarefas prop
          recarregarTarefas={() => {}}
        />
      </tbody>
    </table>
  );
};

export default ListarTarefas;
