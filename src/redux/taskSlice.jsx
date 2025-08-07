import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated async API using setTimeout
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Design Login UI',
          assignedTo: 'designer@example.com',
          status: 'Open',
          priority: 'High',
          startDate: '01Jan2024',
          endDate: '',
        },
        {
          id: '2',
          title: 'Setup CI/CD',
          assignedTo: 'devops@example.com',
          status: 'In-Progress',
          priority: 'Medium',
          startDate: '05Jan2024',
          endDate: '',
        },
        {
          id: '3',
          title: 'Write Unit Tests',
          assignedTo: 'tester@example.com',
          status: 'Under-review',
          priority: 'Low',
          startDate: '10Jan2024',
          endDate: '',
        },
        {
          id: '4',
          title: 'Deploy to Production',
          assignedTo: 'admin@example.com',
          status: 'Done',
          priority: 'High',
          startDate: '15Jan2024',
          endDate: '25Jan2024',
        },
      ]);
    }, 1000);
  });
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateTask: (state, action) => {
      const index = state.list.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteTask: (state, action) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;