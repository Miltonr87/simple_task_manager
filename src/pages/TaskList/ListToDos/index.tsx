import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CloseTask from '../../../actions/CloseTask';
import DeleteTask from '../../../actions/DeleteTask';

interface Task {
  id: number;
  name: string;
  closed: boolean;
}

interface ItemsTaskListProps {
  tasks: Task[];
  tasksReload: (reload: boolean) => void;
}

const listToDos: React.FC<ItemsTaskListProps> = ({ tasks, tasksReload }) => {
  const markCompleted = (task: Task): string => {
    return task.closed ? 'line-through' : 'none';
  };

  return (
    <>
      {tasks.map((task) => (
        <tr key={task.id} data-testid="task">
          <td
            width="75%"
            data-testid="name-task"
            style={{ textDecoration: markCompleted(task) }}
          >
            {task.name}
          </td>
          <td className="text-right">
            <CloseTask
              task={task}
              tasksReload={tasksReload}
              className={task.closed ? 'hidden' : undefined}
            />
            &nbsp;
            <Link
              to={`/update/${task.id}`}
              className={task.closed ? 'hidden' : 'btn btn-warning btn-sm'}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            &nbsp;
            <DeleteTask task={task} tasksReload={tasksReload} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default listToDos;
