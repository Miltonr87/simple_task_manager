import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  name: string;
  closed: boolean;
}

interface ConcluirTarefaProps {
  task: Task;
  tasksReload: (reload: boolean) => void;
  className?: string;
}

const CloseTask: React.FC<ConcluirTarefaProps> = ({
  task,
  tasksReload,
  className,
}) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  const handleConcluirTarefa = (event: React.MouseEvent) => {
    event.preventDefault();
    const tasksDb = localStorage['tasks'];
    let tasks = tasksDb ? JSON.parse(tasksDb) : [];
    tasks = tasks.map((tarefaDb: Task) => {
      if (tarefaDb.id === task.id) {
        tarefaDb.closed = true;
      }
      return tarefaDb;
    });
    localStorage['tasks'] = JSON.stringify(tasks);
    setDisplayModal(false);
    tasksReload(true);
  };

  return (
    <span className={className}>
      <Button
        className="btn-sm"
        onClick={handleOpenModal}
        data-testid="btn-abrir-modal"
      >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal show={displayModal} onHide={handleCloseModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Concluir task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente concluir a seguinte task?
          <br />
          <strong>{task.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleConcluirTarefa}
            data-testid="btn-concluir"
          >
            Sim
          </Button>
          <Button
            variant="light"
            onClick={handleCloseModal}
            data-testid="btn-fechar-modal"
          >
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default CloseTask;
