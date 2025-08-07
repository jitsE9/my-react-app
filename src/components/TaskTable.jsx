import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../redux/taskSlice';

const sortableColumns = ['title', 'assignedTo', 'status', 'priority'];

const TaskTable = () => {
  const { list: tasks } = useSelector(state => state.tasks);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  const handleRowClick = id => {
    navigate(`/task/${id}`);
  };

  const sortedTasks = [...tasks];
  if (sortConfig.key) {
    sortedTasks.sort((a, b) => {
      const aVal = a[sortConfig.key].toLowerCase();
      const bVal = b[sortConfig.key].toLowerCase();
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const changeSort = key => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <table border={1} cellPadding={6} style={{ width: '100%' }}>
      <thead>
        <tr>
          {['title', 'assignedTo', 'status', 'priority', 'startDate', 'endDate'].map(col => (
            <th key={col} onClick={() => sortableColumns.includes(col) && changeSort(col)}>
              {col[0].toUpperCase() + col.slice(1)}{' '}
              {sortConfig.key === col ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map(task => (
          <tr key={task.id} onClick={() => handleRowClick(task.id)}>
            <td>{task.title}</td>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>
            <td>{task.startDate}</td>
            <td>{task.status === 'Done' ? task.endDate : ''}</td>
            <td>
              <button onClick={(e) => handleEdit(e, task.id)}>Edit</button>{' '}
              <button onClick={(e) => handleDelete(e, task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;