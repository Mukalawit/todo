const express = require("express");
const bodyParser = require("body-parser");

const addTaskTemplate = require("./templates/addTaskTemplate");
const {
  addTask,
  viewTasks,
  updateTask,
  showTaskToUpdate,
} = require("./models/tasks");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(addTaskTemplate());
});
app.post("/", (req, res) => {
  addTask(req, res);
});

app.get("/tasks", (req, res) => {
  viewTasks()
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});

app.post("/update/:id", (req, res) => {
  updateTask(req, res);
});

app.get("/update/:id", (req, res) => {
  showTaskToUpdate(req, res);
});

app.listen(3000, () => {
  console.log("Listening");
});
