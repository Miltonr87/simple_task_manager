import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ListToDos from './ListToDos';
import PaginateTasks from '../../actions/PaginateTasks';
import OrderTasks from '../../actions/OrderTasks';
import { getCombinedTasks } from '../../services';

interface Task {
  id: number;
  name: string;
  closed: boolean;
}

const TaskList: React.FC = () => {
  const ITEMS_PER_PAG = 8;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksReload, setTasksReload] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [filterTask, setFilterTask] = useState<string>('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const combinedTasks = await getCombinedTasks(5);
        let FilteredTasks = combinedTasks.filter((t) => {
          return (
            t.name &&
            t.name.toLowerCase().indexOf(filterTask.toLowerCase()) === 0
          );
        });
        if (order === 'asc') {
          FilteredTasks.sort((t1, t2) =>
            t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1
          );
        } else if (order === 'desc') {
          FilteredTasks.sort((t1, t2) =>
            t1.name.toLowerCase() < t2.name.toLowerCase() ? 1 : -1
          );
        }
        setTotalItems(FilteredTasks.length);
        setTasks(
          FilteredTasks.slice(
            (currentPage - 1) * ITEMS_PER_PAG,
            currentPage * ITEMS_PER_PAG
          )
        );
      } catch (error) {
        console.error('Error fetching combined tasks:', error);
      }
    };

    if (tasksReload) {
      getTasks();
      setTasksReload(false);
    }
  }, [tasksReload, currentPage, order, filterTask]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setTasksReload(true);
  };

  const handleOrder = (event: React.MouseEvent) => {
    event.preventDefault();
    if (order === 'none') {
      setOrder('asc');
    } else if (order === 'asc') {
      setOrder('desc');
    } else {
      setOrder('none');
    }
    setTasksReload(true);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTask(event.target.value);
    setTasksReload(true);
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 rounded-lg p-4">
        <div className="text-center mb-4">
          <h3>To Do List</h3>
        </div>

        <Table striped bordered hover responsive data-testid="tabela">
          <thead>
            <tr>
              <th>
                <a
                  href="/"
                  onClick={handleOrder}
                  className="text-dark text-decoration-none"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} size="2x" /> &nbsp;
                  <OrderTasks order={order} />
                </a>
              </th>
              <th>
                <Link
                  to="/create"
                  className="btn btn-success btn-sm"
                  data-testid="btn-nova-task"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; New task
                </Link>
              </th>
            </tr>
            <tr>
              <th>
                <Form.Control
                  type="text"
                  value={filterTask}
                  onChange={handleFilter}
                  data-testid="txt-task"
                  className="filtro-task"
                />
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <ListToDos tasks={tasks} tasksReload={setTasksReload} />
          </tbody>
        </Table>

        <PaginateTasks
          totalItems={totalItems}
          itemsPorPagina={ITEMS_PER_PAG}
          currentPage={currentPage}
          changePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default TaskList;
