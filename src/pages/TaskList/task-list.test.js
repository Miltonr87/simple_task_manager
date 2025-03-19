import React from 'react';
import ReactDOM from 'react-dom';
import ListarTarefas from './listar-tasks';
import Task from '../types/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de listagem de tasks', () => {
  const nomePrimeiraTarefa = 'Primeira task';
  const nomeSegundaTarefa = 'Segunda task';
  const nomeTerceiraTarefa = 'Terceira task';

  beforeEach(() => {
    localStorage['tasks'] = JSON.stringify([
      new Task(1, nomePrimeiraTarefa, false),
      new Task(2, nomeSegundaTarefa, false),
      new Task(3, nomeTerceiraTarefa, false),
    ]);
  });

  afterEach(() => {
    delete localStorage['tasks'];
  });

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListarTarefas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir uma tabela contendo 3 tasks', () => {
    const { getByTestId } = render(<ListarTarefas />);
    const tabela = getByTestId('tabela');
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
    expect(tabela).toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
  });

  it('deve filtrar os dados da tabela de tasks', () => {
    const { getByTestId } = render(<ListarTarefas />);
    fireEvent.change(getByTestId('txt-task'), {
      target: { value: nomePrimeiraTarefa },
    });
    const tabela = getByTestId('tabela');
    expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
    expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);
  });
});
