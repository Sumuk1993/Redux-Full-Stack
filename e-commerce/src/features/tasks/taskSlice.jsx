import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";


// GET
export const fetchTasks = createAsyncThunk(      //createAsyncThunk is used to create async actions for fetching, adding, and deleting tasks
  "tasks/fetch", async () => {                   //fetchTasks
    const res = await api.get("/tasks");           //api.get("/tasks")
    return res.data;                               //return res.data
  });                                  //Gets all tasks from backend

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
  //payload:Data
  name: "tasks",                     //Name of the slice
  initialState: {                    //Initial state with an empty tasks array and loading set to false
    tasks: [],
    loading: false,
  },
  //reducer defines handling synchronous actions (not used here, as we are using extraReducers for async actions)
  reducers: {},
  //extraReducers: Handle async actions
  extraReducers: (builder) => {
    builder                         //Handle pending, fulfilled, and rejected states for fetchTasks, addTask, and deleteTask async actions
      .addCase(fetchTasks.pending, (state) => { 
        state.loading = true;
      })                        //When fetchTasks is pending → set loading to true  
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })                        //When data comes → store it

      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })                                          //👉 Add new task to state

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t._id !== action.payload
        );
      });                                         //👉 Remove deleted task from state
  },
});

export default taskSlice.reducer;