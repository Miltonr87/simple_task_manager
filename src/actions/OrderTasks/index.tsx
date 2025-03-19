import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';

interface OrdenacaoProps {
  readonly order: 'asc' | 'desc' | 'none';
}

function OrderTasks({ order }: OrdenacaoProps) {
  function handleSortIconVisibility() {
    return order === 'none' ? '' : 'hidden';
  }
  function handleAsc() {
    return order === 'asc' ? '' : 'hidden';
  }
  function handleDesc() {
    return order === 'desc' ? '' : 'hidden';
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

export default OrderTasks;
