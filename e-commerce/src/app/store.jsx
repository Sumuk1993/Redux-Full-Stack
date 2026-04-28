import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({//Store configuration for Redux

  //Payload: Data structure for the Redux store
  reducer: {
    tasks: taskReducer,
  },
});// Configure Redux store with task reducer