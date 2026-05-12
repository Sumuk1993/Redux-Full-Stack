import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({//createApi to define the API slice for tasks
  reducerPath: "taskApi",         //P:Data Payload will be stored under "taskApi" in the Redux store
  baseQuery: fetchBaseQuery({     //baseQuery defines how to make the API requests, using fetchBaseQuery
    baseUrl: "http://localhost:5000",//Base URL for API req is http://localhost:5000 (where our backend server is running)
  }),
  tagTypes: ["Tasks"],            //Payloads can be tagged with "Tasks"

  endpoints: (builder) => ({      //endpoints defines the different API operations (GET, POST, DELETE) for tasks
    // GET tasks
    getTasks: builder.query({     //Define a GET endpoint named "getTasks" to fetch all tasks
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),

    // ADD task
    addTask: builder.mutation({   //Define a POST endpoint named "addTask" to create a new task
      query: (title) => ({
        url: "/tasks",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),

    // DELETE task
    deleteTask: builder.mutation({//Define a DELETE endpoint named "deleteTask" to delete a task by its ID
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = taskApi;