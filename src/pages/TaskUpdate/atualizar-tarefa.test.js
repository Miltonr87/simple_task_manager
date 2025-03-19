import React from 'react';
import ReactDOM from 'react-dom';
import UpdateTask from './handleUpdate-task';
import Task from '../types/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de atualiazação de tasks', () => {
  const tarefaId = 1;
  const task = new Task(tarefaId, 'Nova task', false);

  beforeEach(() => {
    localStorage['tasks'] = JSON.stringify([task]);
  });

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UpdateTask id={tarefaId} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a modal de sucesso ao handleUpdate uma task', () => {
    const { getByTestId } = render(<UpdateTask id={tarefaId} />);
    fireEvent.click(getByTestId('btn-handleUpdate'));
    expect(getByTestId('modal')).toHaveTextContent('Success');
  });

  it('deve handleUpdate uma task', () => {
    const nomeTarefaAtualizada = 'Task atualizada';
    const { getByTestId } = render(<UpdateTask id={tarefaId} />);
    fireEvent.change(getByTestId('txt-task'), {
      target: { value: nomeTarefaAtualizada },
    });
    fireEvent.click(getByTestId('btn-handleUpdate'));
    const tasksDb = JSON.parse(localStorage['tasks']);
    expect(tasksDb[0].name).toBe(nomeTarefaAtualizada);
  });
});
