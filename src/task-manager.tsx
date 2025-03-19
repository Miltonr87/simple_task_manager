import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import CreateTask from './pages/TaskCreation';
import UpdateTask from './pages/TaskUpdate';

const TaskManager: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/update/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
};

export default TaskManager;
