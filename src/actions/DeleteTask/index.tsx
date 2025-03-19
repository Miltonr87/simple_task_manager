import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  name: string;
}

interface DeleteTaskProps {
  task: Task;
  tasksReload: (reload: boolean) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task, tasksReload }) => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const handleOpenModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setDisplayModal(true);
  };

  const handleCloseModal = () => {
    setDisplayModal(false);
  };

  const handleDeleteTask = (event: React.MouseEvent) => {
    event.preventDefault();
    const tasksDb = localStorage.getItem('tasks');
    let tasks = tasksDb ? JSON.parse(tasksDb) : [];
    tasks = tasks.filter((tarefaDb: Task) => tarefaDb.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setDisplayModal(false);
    tasksReload(true);
  };

  return (
    <span>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={handleOpenModal}
        data-testid="btn-abrir-modal"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={displayModal} onHide={handleCloseModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to delete the following task?
          <br />
          <strong>{task.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleDeleteTask}
            data-testid="btn-remover"
          >
            Yes
          </Button>
          <Button variant="light" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};

export default DeleteTask;
