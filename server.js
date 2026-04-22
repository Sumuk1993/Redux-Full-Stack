const express = require("express");     //Import Express framework for building the server
const mongoose = require("mongoose");   //Import Mongoose for MongoDB interactions
const cors = require("cors");           //Import CORS middleware to enable Cross-Origin Resource Sharing

const app = express();                  //create an Express application instance

app.use(cors());                //Enable CORS
app.use(express.json());        //Middleware to parse JSON request bodies

// DB
mongoose.connect("mongodb://127.0.0.1:27017/tasks")//Connect to MongoDB database named "tasks"
  .then(() => console.log("MongoDB Connected"))    //Log success message on successful connection
  .catch(err => console.log(err));                 //Log any errors that occur during connection

// Schema
const TaskSchema = new mongoose.Schema({           //Define a Mongoose schema for tasks with title and completed fields
  title: String,
  completed: { type: Boolean, default: false }
});

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

// cd backend
// npm init -y
// npm install express mongoose cors
// node server.js