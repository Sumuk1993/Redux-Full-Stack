import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "../features/tasks/taskApi";

export const store = configureStore({ //configurestore defines the Redux store for the application

  reducer: { [taskApi.reducerPath]: taskApi.reducer, },//Reducer define handles sync actions and updates the state.
  
  //Middleware handles async actions and side effects, such as API calls.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),//Concat define a middleware for handling API requests.

});