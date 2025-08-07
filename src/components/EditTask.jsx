import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../redux/taskSlice';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector(state => state.tasks.list.find(t => t.id === id));

  const [formData, setFormData] = React.useState(task);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateTask(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Edit Task</h2>
      {['title', 'assignedTo', 'status', 'priority', 'startDate', 'endDate'].map(field => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            required={field !== 'endDate'}
          />
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
};

export default EditTask;