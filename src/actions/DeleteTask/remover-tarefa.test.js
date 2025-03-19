import React from 'react';
import ReactDOM from 'react-dom';
import DeleteTask from './remover-task';
import Task from '../types/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de remoção de tasks', () => {
  const nomeTarefa = 'Task de teste';
  const task = new Task(1, nomeTarefa, false);

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DeleteTask task={task} tasksReload={() => false} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a modal', () => {
    const { getByTestId } = render(
      <DeleteTask task={task} tasksReload={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
  });

  it('deve remover uma task', () => {
    localStorage['tasks'] = JSON.stringify([task]);
    const { getByTestId } = render(
      <DeleteTask task={task} tasksReload={() => false} />
    );
    fireEvent.click(getByTestId('btn-abrir-modal'));
    fireEvent.click(getByTestId('btn-remover'));
    const tasksDb = JSON.parse(localStorage['tasks']);
    expect(tasksDb.length).toBe(0);
  });
});
