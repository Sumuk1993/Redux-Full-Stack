import React, { useState } from "react";
import "./TaskList.css";
import { useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery } from "./taskApi";

function TaskList() {
  const [title, setTitle] = useState("");

  // RTK Query hooks
  const { data: tasks = [], isLoading } = useGetTasksQuery();//useGetTasksQuery define a hook to fetch tasks.
  const [addTask] = useAddTaskMutation();     //useAddTaskMutation define a hook to add a new task.
  const [deleteTask] = useDeleteTaskMutation();//useDeleteTaskMutation define a hook to delete a task.

  // handleAdd method defne handle adding a new task. It checks if the title is not empty.
  const handleAdd = async () => {
    if (title.trim()) {
      await addTask(title);
      setTitle("");
    }
  };

  return (
    <div>
      <h2>Task List</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task" className="inptg"/>
      <button onClick={handleAdd} className="btntg">Add</button>
      <ul>{isLoading ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task,index) => (
          <li key={task._id} className="litg">
            {task.title}
            <button onClick={() => deleteTask(task._id)} className="btntgs">🗑️Delete</button>
          </li>
        ))
      )}</ul>
    </div>
  );
}

export default TaskList;