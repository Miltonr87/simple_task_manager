import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Form, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

interface Task {
  id: number;
  name: string;
}

const UpdateTask: React.FC = () => {
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [task, setTask] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const tasksDb = localStorage.getItem('tasks');
      const tasks: Task[] = tasksDb ? JSON.parse(tasksDb) : [];
      const taskFound = tasks.find((t) => t.id === parseInt(id, 10));
      if (taskFound) {
        setTask(taskFound.name);
      }
    }
  }, [id]);

  const handleCloseModal = () => {
    navigate('/');
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValidated(true);

    if (event.currentTarget.checkValidity()) {
      const tasksDb = localStorage.getItem('tasks');
      let tasks: Task[] = tasksDb ? JSON.parse(tasksDb) : [];

      if (id) {
        tasks = tasks.map((tarefaObj) =>
          tarefaObj.id === parseInt(id, 10)
            ? { ...tarefaObj, name: task }
            : tarefaObj
        );

        localStorage.setItem('tasks', JSON.stringify(tasks));
        setDisplayModal(true);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center">Update The Task</h3>
      <Card className="p-4 bg-light">
        <Card.Body>
          <Form onSubmit={handleUpdate} noValidate validated={formValidated}>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the task"
                minLength={5}
                maxLength={100}
                required
                data-testid="txt-task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                The task must contain at least 5 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-handleUpdate"
              >
                Update
              </Button>
              &nbsp;
              <Button variant="light" onClick={() => navigate('/')}>
                Return
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={displayModal} onHide={handleCloseModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UpdateTask;
