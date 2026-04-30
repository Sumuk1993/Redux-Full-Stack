const express = require("express");     //used to create server & APIs
const mongoose = require("mongoose");   //used to connects Node.js with MongoDB
const cors = require("cors");           //allows frontend (like React) to call backend APIs CORS(Cross-Origin Resource Sharing

const app = express();                  //Creates your server app

app.use(cors());                //allows requests from different ports (React → Node)
app.use(express.json());        //converts request data into JSON

// DB
mongoose.connect("mongodb://127.0.0.1:27017/tasks")//Connect to MongoDB database named "tasks"
  .then(() => console.log("MongoDB Connected"))    //success → "MongoDB Connected"
  //Catch defined to handle errors during connection and log them to the console
  .catch(err => console.log(err));                 //catch error → log error to console

// Schema
const TaskSchema = new mongoose.Schema({           //Define the structure of data
  title: String,                                   //Title of the task, stored as a string
  completed: { type: Boolean, default: false }     //completed true/false, default is false (not completed)
});

const Task = mongoose.model("Task", TaskSchema);  //Create a Mongoose model named "Task" based on the TaskSchema

// APIs
app.get("/tasks", async (req, res) => {           //Define a GET API endpoint to fetch all tasks from the database
  const data = await Task.find();
  res.json(data);
});                  //Get all tasks from the database and respond with the data in JSON format

app.post("/tasks", async (req, res) => {          //Define a POST API endpoint to create a new task with the title provided in the request body
  const task = await Task.create({ title: req.body.title });
  res.json(task);                                 //Respond with the created task in JSON format
});                 //Post a new task to the database

// PUT update task
app.put("/tasks/:id", async (req, res) => {       //Define a PUT API endpoint to update an existing task by its ID provided in the URL parameters
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});                  //Update a task in the database

app.delete("/tasks/:id", async (req, res) => {    //Define a DELETE API endpoint to delete a task by its ID provided in the URL parameters
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});                 //Delete a task from the database

app.listen(5000, () => console.log("Server running on 5000"));//Start the server and listen on port 5000

// To run the server:

// cd Redux_FullStack
// npm init -y
// npm install express mongoose cors
// node server.js