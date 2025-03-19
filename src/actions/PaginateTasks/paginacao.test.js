import React from 'react';
import ReactDOM from 'react-dom';
import PaginateTasks from './pagination';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de paginação', () => {
  it('deve renderizar o componente sem erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <PaginateTasks
        totalItems={10}
        itemsPorPagina={10}
        currentPage={1}
        changePage={() => false}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('deve exibir a paginação contendo 3 páginas', () => {
    const { getByTestId } = render(
      <PaginateTasks
        totalItems={15}
        itemsPorPagina={5}
        currentPage={1}
        changePage={() => false}
      />
    );
    const pagination = getByTestId('pagination');
    expect(pagination).toHaveTextContent('1');
    expect(pagination).toHaveTextContent('2');
    expect(pagination).toHaveTextContent('3');
  });
});
