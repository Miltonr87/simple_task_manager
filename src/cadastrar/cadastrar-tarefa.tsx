import React, { useState, FormEvent } from 'react';
import { Button, Form, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Tarefa from '../types/tarefa.model';

const CadastrarTarefa: React.FC = () => {
  const [tarefa, setTarefa] = useState<string>('');
  const [formValidado, setFormValidado] = useState<boolean>(false);
  const [exibirModal, setExibirModal] = useState<boolean>(false);
  const navigate = useNavigate();

  function cadastrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormValidado(true);

    // Check form validity
    if (event.currentTarget.checkValidity()) {
      const tarefasDb = localStorage.getItem('tarefas');
      const tarefas: Tarefa[] = tarefasDb ? JSON.parse(tarefasDb) : [];

      // Create a new Tool and add it to the list
      const novaTarefa = new Tarefa(new Date().getTime(), tarefa, false);
      tarefas.push(novaTarefa);

      // Save back to localStorage
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      setExibirModal(true);
    }
  }

  function handleTxtTarefa(event: React.ChangeEvent<HTMLInputElement>) {
    setTarefa(event.target.value);
  }

  function handleFecharModal() {
    navigate('/');
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center">Cadastrar</h3>
      <Card className="p-4 bg-light">
        <Card.Body>
          <Form validated={formValidado} noValidate onSubmit={cadastrar}>
            <Form.Group>
              <Form.Label>Tarefa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a tarefa"
                minLength={5}
                maxLength={100}
                required
                value={tarefa}
                onChange={handleTxtTarefa}
                data-testid="txt-tarefa"
              />
              <Form.Control.Feedback type="invalid">
                A tarefa deve conter ao menos 5 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-cadastrar"
              >
                Cadastrar
              </Button>
              &nbsp;
              <Button variant="light" onClick={() => navigate('/')}>
                Voltar
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFecharModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CadastrarTarefa;
