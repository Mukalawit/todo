const layout = require("./layout");
const getErrors = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
      <form method="POST">
      <label>Task name:</label>
      <input name="taskName" placeholder="task name" />
      ${getErrors(errors, "taskName")}
      <label>Task description</label>
      <textarea name="taskDescription" placeholder="Task description" /></textarea>
      ${getErrors(errors, "taskDescription")}
      <button>Create Task</button>
      </form>
      </div>
    `,
  });
};
