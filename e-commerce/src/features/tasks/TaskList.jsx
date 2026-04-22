import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, deleteTask } from "./taskSlice";
import "./TaskList.css";

function TaskList() {
  const dispatch = useDispatch();                                //dispatch to send actions
  const { tasks, loading } = useSelector((state) => state.tasks);//useSelector to get tasks and loading from state
  const [title, setTitle] = useState("");                        //Store title in local state
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => { dispatch(fetchTasks()); }, [dispatch]);//Fetch tasks on component mount

  const handleAdd = () => { //Handle add task
    if (title.trim()) {         //Add task if title is not empty and reset input
      dispatch(addTask(title)); //Dispatch addTask action
      setTitle("");             //Reset input after adding task
    }                           //Add task if title is not empty and reset input
  };

  if (loading)                   //Show loading state while fetching tasks
    return <p>Loading...</p>;   //Show loading state while fetching tasks

  return (                      //Render task list and input for adding tasks
    <div className="divtag" >
      <h2>Task App</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task" className="inptg" />
      <button onClick={handleAdd} className="btntg">Add</button>

      <ul>{tasks.map((task) => (
        <li key={task._id} className="litg">
          {task.title}
          <button onClick={() => dispatch(deleteTask(task._id))} className="btntgs">
            Delete
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default TaskList;