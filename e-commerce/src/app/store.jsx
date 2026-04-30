import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

//central storage (global state) of the app, so any component can access it
export const store = configureStore({//Store configuration for Redux

  //Payload: Data structure for the Redux store
  reducer: {
    tasks: taskReducer,
  },
});// Configure Redux store with task reducer