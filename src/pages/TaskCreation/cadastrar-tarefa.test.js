import React from 'react';
import ReactDOM from 'react-dom';
import TaskCreation from './register-task';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de cadastro de tasks', () => {
  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TaskCreation />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve register uma nova task', () => {
    const { getByTestId } = render(<TaskCreation />);
    fireEvent.change(getByTestId('txt-task'), {
      target: { value: 'Testar componente' },
    });
    fireEvent.click(getByTestId('btn-register'));
    expect(getByTestId('modal')).toHaveTextContent('Success');
    expect(getByTestId('modal')).toHaveTextContent(
      'Task adicionada com sucesso!'
    );
  });
});
