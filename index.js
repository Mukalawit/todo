const express = require("express");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");

const { requireTaskName, requireTaskDescription } = require("./validators");
const handleErrors = require('./handleErrors')
const addTaskTemplate = require("./templates/addTaskTemplate");
const updateTaskTemplate = require("./templates/updateTaskTemplate");
const displayTaskTemplate = require("./templates/displayTaskTemplate");
const {
  addTask,
  viewTasks,
  updateTask,
  showTaskToUpdate,
} = require("./models/tasks");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(addTaskTemplate({ req }));
});
app.post("/", [requireTaskName, requireTaskDescription], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(addTaskTemplate({ req, errors }));
  }

  const { taskName, taskDescription } = req.body;
  addTask(taskName, taskDescription);
  res.redirect("/tasks");
});

app.get("/tasks", async (req, res) => {
  const response = await viewTasks();

  res.send(displayTaskTemplate(response));
});

app.post(
  "/update/:id",
  [requireTaskName, requireTaskDescription],
  //handleErrors,
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    const { id } = req.params;
    // console.log(errors)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      showTaskToUpdate(id).then((response) => {
        res.send(updateTaskTemplate(response, errors));
      });
      return
    }
    const { taskName, taskDescription } = req.body;
    await updateTask(taskName, taskDescription, id);
    res.redirect("/tasks");
  }
);

// Why do we have a get method on update

app.get("/update/:id", (req, res) => {
  const { id } = req.params;
  showTaskToUpdate(id).then((response) => {
    res.send(updateTaskTemplate(response));
  });
});

app.listen(3000, () => {
  console.log("Listening");
});
