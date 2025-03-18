import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Tarefa {
  id: number;
  nome: string;
}

interface RemoverTarefaProps {
  tarefa: Tarefa;
  recarregarTarefas: (recarregar: boolean) => void;
}

const RemoverTarefa: React.FC<RemoverTarefaProps> = ({
  tarefa,
  recarregarTarefas,
}) => {
  const [exibirModal, setExibirModal] = useState<boolean>(false);

  const handleAbrirModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setExibirModal(true);
  };

  const handleFecharModal = () => {
    setExibirModal(false);
  };

  const handleRemoverTarefa = (event: React.MouseEvent) => {
    event.preventDefault();
    const tarefasDb = localStorage.getItem('tarefas');
    let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
    tarefas = tarefas.filter((tarefaDb: Tarefa) => tarefaDb.id !== tarefa.id);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    setExibirModal(false);
    recarregarTarefas(true);
  };

  return (
    <span>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={handleAbrirModal}
        data-testid="btn-abrir-modal"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Remover tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover a seguinte tarefa?
          <br />
          <strong>{tarefa.nome}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleRemoverTarefa}
            data-testid="btn-remover"
          >
            Sim
          </Button>
          <Button variant="light" onClick={handleFecharModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default RemoverTarefa;
