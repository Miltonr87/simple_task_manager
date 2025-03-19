import React from 'react';
import ReactDOM from 'react-dom';
import ItemsListToDos from './itens-lista-tasks';
import Task from '../types/task.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente que exibe um item da listagem de tasks', () => {
  const nomeTarefa = 'Task';
  const task = new Task(1, nomeTarefa, false);
  const tarefaConcluida = new Task(2, nomeTarefa, true);

  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ItemsListToDos tasks={[]} tasksReload={() => false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a task', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItemsListToDos tasks={[task]} tasksReload={() => false} />
        </tbody>
      </table>
    );
    expect(getByTestId('task')).toHaveTextContent(nomeTarefa);
  });

  it('deve exibir uma task closed', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItemsListToDos tasks={[tarefaConcluida]} tasksReload={() => false} />
        </tbody>
      </table>
    );
    expect(getByTestId('name-task')).toHaveStyle(
      'text-decoration: line-through'
    );
  });
});
