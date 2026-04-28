const express = require("express");     //used to create server & APIs
const mongoose = require("mongoose");   //used to connects Node.js with MongoDB
const cors = require("cors");           //allows frontend (React) to talk to backend CORS(Cross-Origin Resource Sharing

const app = express();                  //Creates your server app

app.use(cors());                //allows requests from different ports (React → Node)
app.use(express.json());        //converts request body into JSON

// DB
mongoose.connect("mongodb://127.0.0.1:27017/tasks")//Connect to MongoDB database named "tasks"
  .then(() => console.log("MongoDB Connected"))    //success → "MongoDB Connected"
  .catch(err => console.log(err));                 //error → prints error

// Schema
const TaskSchema = new mongoose.Schema({           //Define a Mongoose schema for tasks with title and completed fields
  title: String,
  completed: { type: Boolean, default: false }
});                                               //Schema = structure of data

const Task = mongoose.model("Task", TaskSchema);  //Create a Mongoose model named "Task" based on the TaskSchema

// APIs
app.get("/tasks", async (req, res) => {           //Define a GET API endpoint to fetch all tasks from the database
  const data = await Task.find();
  res.json(data);
});

app.post("/tasks", async (req, res) => {          //Define a POST API endpoint to create a new task with the title provided in the request body
  const task = await Task.create({ title: req.body.title });
  res.json(task);                                 //Respond with the created task in JSON format
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {       //Define a PUT API endpoint to update an existing task by its ID provided in the URL parameters
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/tasks/:id", async (req, res) => {    //Define a DELETE API endpoint to delete a task by its ID provided in the URL parameters
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));//Start the server and listen on port 5000, logging a message to the console when the server is running

// To run the server:

// cd Redux_FullStack
// npm init -y
// npm install express mongoose cors
// node server.js