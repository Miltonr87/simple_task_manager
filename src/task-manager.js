import React from 'react';
import './task-manager.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListTasks from './list/list-tasks';
import CreateTask from './create/create-task';
import UpdateTask from './update/update-task';

function TaskManager() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<ListTasks />} />
    //     <Route path="/create" element={<CreateTask />} />
    //     <Route path="/update/:id" element={<UpdateTask />} />
    //   </Routes>
    // </Router>
    <div>
      <ListTasks />
      <CreateTask />
      <UpdateTask />
    </div>
  );
}

export default TaskManager;
