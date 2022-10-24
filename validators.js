const { check } = require("express-validator");

module.exports = {
  requireTaskName: check("taskName", "Please provide a task name")
    .trim()
    .notEmpty(),
  requireTaskDescription: check(
    "taskDescription",
    "Please provide a task description"
  )
    .trim()
    .notEmpty(),
};
