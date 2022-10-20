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
    .then((response) => {
      const renderedItems = response
        .map((item) => {
          return `<li>Task name:${item.name}</li>`;
        })
        .join("");

      return `<ul>${renderedItems}</ul>`;
    })
    .catch((error) => res.send(error));
});

app.post("/update/:id", (req, res) => {
  const { taskName, taskDescription } = req.body;
  const { id } = req.params;
  updateTask(taskName, taskDescription, id).then((response) => {
    res.redirect("/tasks");
  });
});

app.get("/update/:id", (req, res) => {
  const { id } = req.params;
  showTaskToUpdate(id).then((response) => {
    const renderedItem = response.map((item) => {
      return `<label>Task name<input name="taskName" value="${item.name}" /> <label>Task description</label><textarea name="taskDescription" />${item.description}</textarea>`;
    });

    res.send(
      `<form method="POST">${renderedItem}<button>Update</button></form>`
    );
  });
});

app.listen(3000, () => {
  console.log("Listening");
});
