const { check } = require("express-validator");

module.exports = {
  requireTaskName: check("taskName", "No task name found")
    // .trim()
    .notEmpty()
    .custom((value) => {
      if (!value) {
        throw new Error("Task Name has not been provided");
      }
    }),
  requireTaskDescription: check("taskDescription")
    // .trim()
    .notEmpty()
    .custom((value) => {
      if (!value) {
        throw new Error("Task Description has not been provided");
      }
    }),
};
