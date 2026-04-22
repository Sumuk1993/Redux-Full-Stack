import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";


// GET
export const fetchTasks = createAsyncThunk(      //createAsyncThunk is used to create async actions for fetching, adding, and deleting tasks
  "tasks/fetch", async () => {                   //fetchTasks
  const res = await api.get("/tasks");           //api.get("/tasks")
  return res.data;                               //return res.data
});

// ADD
export const addTask = createAsyncThunk("tasks/add", async (title) => {
  const res = await api.post("/tasks", { title });//Api call to add a new task with the given title
  return res.data;
});

// DELETE
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await api.delete(`/tasks/${id}`);               //Api call to delete a task by its ID
  return id;
});

const taskSlice = createSlice({      //createSlice to define the task slice of the Redux store
  name: "tasks",                     //Name of the slice
  initialState: {                    //Initial state with an empty tasks array and loading set to false
    tasks: [],                       
    loading: false,
  },
  reducers: {},                     //No regular reducers, only extraReducers for handling async actions
  extraReducers: (builder) => {     
    builder                         //Handle pending, fulfilled, and rejected states for fetchTasks, addTask, and deleteTask async actions
      .addCase(fetchTasks.pending, (state) => { //Set loading to true when fetching tasks
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {//Set loading to false and update tasks with fulfilled
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {//Add new task to tasks array when addTask is fulfilled
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {//Remove task from tasks array when deleteTask is fulfilled by filtering out the deleted task
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;