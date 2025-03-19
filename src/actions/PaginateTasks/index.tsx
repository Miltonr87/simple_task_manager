import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface PaginationProps {
  totalItems: number;
  itemsPorPagina: number;
  currentPage: number;
  changePage: (page: number) => void;
}

const PaginateTasks: React.FC<PaginationProps> = ({
  totalItems,
  itemsPorPagina,
  currentPage,
  changePage,
}) => {
  const generateFirstItem = () => (
    <Pagination.First
      key="pagFirst"
      onClick={() => changePage(1)}
      disabled={currentPage === 1}
    />
  );

  const generatePreviousItem = () => (
    <Pagination.Prev
      key="pagPrev"
      onClick={() => changePage(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

  const generateNumericItem = (page: number) => (
    <Pagination.Item
      key={page}
      active={page === currentPage}
      onClick={() => changePage(page)}
    >
      {page}
    </Pagination.Item>
  );

  const generateNextItem = (numPages: number) => (
    <Pagination.Next
      key="pagNext"
      onClick={() => changePage(currentPage + 1)}
      disabled={currentPage === numPages}
    />
  );

  const generateLastItem = (numPages: number) => (
    <Pagination.Last
      key="pagLast"
      onClick={() => changePage(numPages)}
      disabled={currentPage === numPages}
    />
  );

  const getPagination = () => {
    const numPages = Math.ceil(totalItems / itemsPorPagina);
    const items: JSX.Element[] = [];

    // Push pagination items into the array
    items.push(generateFirstItem());
    items.push(generatePreviousItem());

    // Add page number items conditionally
    for (let page = 1; page <= numPages; page++) {
      items.push(generateNumericItem(page));
    }

    // Add next and last pagination items
    items.push(generateNextItem(numPages));
    items.push(generateLastItem(numPages));

    return items;
  };

  return <Pagination data-testid="pagination">{getPagination()}</Pagination>;
};

export default PaginateTasks;
