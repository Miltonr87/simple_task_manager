import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface PaginacaoProps {
  totalItems: number;
  itemsPorPagina: number;
  paginaAtual: number;
  mudarPagina: (pagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({
  totalItems,
  itemsPorPagina,
  paginaAtual,
  mudarPagina,
}) => {
  const gerarPrimeiroItem = () => (
    <Pagination.First
      key="pagFirst"
      onClick={() => mudarPagina(1)}
      disabled={paginaAtual === 1}
    />
  );

  const gerarItemAnterior = () => (
    <Pagination.Prev
      key="pagPrev"
      onClick={() => mudarPagina(paginaAtual - 1)}
      disabled={paginaAtual === 1}
    />
  );

  const gerarItemNumerico = (pagina: number) => (
    <Pagination.Item
      key={pagina}
      active={pagina === paginaAtual}
      onClick={() => mudarPagina(pagina)}
    >
      {pagina}
    </Pagination.Item>
  );

  const gerarProximoItem = (numPaginas: number) => (
    <Pagination.Next
      key="pagNext"
      onClick={() => mudarPagina(paginaAtual + 1)}
      disabled={paginaAtual === numPaginas}
    />
  );

  const gerarUltimoItem = (numPaginas: number) => (
    <Pagination.Last
      key="pagLast"
      onClick={() => mudarPagina(numPaginas)}
      disabled={paginaAtual === numPaginas}
    />
  );

  const obterPaginacao = () => {
    const numPaginas = Math.ceil(totalItems / itemsPorPagina);
    const items: JSX.Element[] = [];

    // Push pagination items into the array
    items.push(gerarPrimeiroItem());
    items.push(gerarItemAnterior());

    // Add page number items conditionally
    for (let pagina = 1; pagina <= numPaginas; pagina++) {
      items.push(gerarItemNumerico(pagina));
    }

    // Add next and last pagination items
    items.push(gerarProximoItem(numPaginas));
    items.push(gerarUltimoItem(numPaginas));

    return items;
  };

  return <Pagination data-testid="paginacao">{obterPaginacao()}</Pagination>;
};

export default Paginacao;
