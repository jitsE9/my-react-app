import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './redux/taskSlice';
import TaskTable from './components/TaskTable';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<TaskTable />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  );
};

export default App;