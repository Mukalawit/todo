const express = require("express");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");

const { requireTaskName, requireTaskDescription } = require("./validators");
const {addTaskTemplate,displayTaskTemplate,updateTaskTemplate }= require("./templates");
const {
  addTask,
  viewTasks,
  updateTask,
  showTaskToUpdate,
  deleteTask,
} = require("./models/tasks");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(addTaskTemplate({ req }));
});
app.post("/", [requireTaskName, requireTaskDescription], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send(addTask({ req, errors }));
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

  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    const { id } = req.params;
  
    if (!errors.isEmpty()) {
      console.log(errors.array());
      showTaskToUpdate(id).then((response) => {
        res.send(updateTaskTemplate(response, errors));
      });
      return;
    }
    const { taskName, taskDescription } = req.body;
    await updateTask(taskName, taskDescription, id);
    res.redirect("/tasks");
  }
);



app.get("/update/:id", (req, res) => {
  const { id } = req.params;
  showTaskToUpdate(id).then((response) => {
    res.send(updateTask(response));
  });
});

app.post("/delete/:id" , async (req,res)=>{

  await deleteTask(req.params.id)
  res.redirect('/tasks')
 
 })

app.listen(3000, () => {
  console.log("Listening");
});
