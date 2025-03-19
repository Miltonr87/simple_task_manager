import React, { useState, FormEvent } from 'react';
import { Button, Form, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Task from '../../types';

const TaskCreation: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormValidated(true);

    if (event.currentTarget.checkValidity()) {
      const tasksDb = localStorage.getItem('tasks');
      const tasks: Task[] = tasksDb ? JSON.parse(tasksDb) : [];
      const newTask = new Task(new Date().getTime(), task, false);
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setDisplayModal(true);
    }
  }

  function handleTxtTask(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleCloseModal() {
    navigate('/');
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center">Register</h3>
      <Card className="p-4 bg-light">
        <Card.Body>
          <Form validated={formValidated} noValidate onSubmit={register}>
            <Form.Group>
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the task"
                minLength={5}
                maxLength={100}
                required
                value={task}
                onChange={handleTxtTask}
                data-testid="txt-task"
              />
              <Form.Control.Feedback type="invalid">
                The task must contain at least 5 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-register"
              >
                Register
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
        <Modal.Body>Task added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskCreation;
