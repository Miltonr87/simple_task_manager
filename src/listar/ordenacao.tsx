import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

interface OrdenacaoProps {
  readonly ordenar: 'asc' | 'desc' | 'none';
}

function Ordenacao({ ordenar }: OrdenacaoProps) {
  // Returns visibility for the sort icon (default state)
  function handleSortIconVisibility() {
    return ordenar === 'none' ? '' : 'hidden';
  }

  // Returns visibility for ascending icon
  function handleAsc() {
    return ordenar === 'asc' ? '' : 'hidden';
  }

  // Returns visibility for descending icon
  function handleDesc() {
    return ordenar === 'desc' ? '' : 'hidden';
  }

  return (
    <span>
      <FontAwesomeIcon
        icon={faSort}
        className={handleSortIconVisibility()}
        data-testid="faSort"
      />
      <FontAwesomeIcon
        icon={faSortUp}
        className={handleAsc()}
        data-testid="faSortUp"
      />
      <FontAwesomeIcon
        icon={faSortDown}
        className={handleDesc()}
        data-testid="faSortDown"
      />
    </span>
  );
}

export default Ordenacao;
