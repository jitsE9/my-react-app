import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const { id } = useParams();
  const task = useSelector(state => state.tasks.list.find(t => t.id === id));

  if (!task) return <p>Task not found</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Task Details</h2>
      <ul>
        {Object.entries(task).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value || 'N/A'}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDetails;