import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Form, Container, Card, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

interface Tarefa {
  id: number;
  nome: string;
}

const AtualizarTarefa: React.FC = () => {
  const [exibirModal, setExibirModal] = useState<boolean>(false);
  const [formValidado, setFormValidado] = useState<boolean>(false);
  const [tarefa, setTarefa] = useState<string>('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const tarefasDb = localStorage.getItem('tarefas');
      const tarefas: Tarefa[] = tarefasDb ? JSON.parse(tarefasDb) : [];
      const tarefaEncontrada = tarefas.find((t) => t.id === parseInt(id, 10));
      if (tarefaEncontrada) {
        setTarefa(tarefaEncontrada.nome);
      }
    }
  }, [id]);

  const handleFecharModal = () => {
    navigate('/');
  };

  const atualizar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValidado(true);

    if (event.currentTarget.checkValidity()) {
      const tarefasDb = localStorage.getItem('tarefas');
      let tarefas: Tarefa[] = tarefasDb ? JSON.parse(tarefasDb) : [];

      if (id) {
        tarefas = tarefas.map((tarefaObj) =>
          tarefaObj.id === parseInt(id, 10)
            ? { ...tarefaObj, nome: tarefa }
            : tarefaObj
        );

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        setExibirModal(true);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center">Atualizar</h3>
      <Card className="p-4 bg-light">
        <Card.Body>
          <Form onSubmit={atualizar} noValidate validated={formValidado}>
            <Form.Group>
              <Form.Label>Tarefa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a tarefa"
                minLength={5}
                maxLength={100}
                required
                data-testid="txt-tarefa"
                value={tarefa}
                onChange={(e) => setTarefa(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                A tarefa deve conter ao menos 5 caracteres.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-atualizar"
              >
                Atualizar
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
        <Modal.Body>Tarefa atualizada com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFecharModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AtualizarTarefa;
