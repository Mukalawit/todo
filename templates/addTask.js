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
      <label class="label">Task name:</label>
      <input name="taskName" placeholder="task name"class="input"/>
      ${getErrors(errors, "taskName")}
      <label class="label">Task description</label>
      <textarea name="taskDescription" placeholder="Task description" class="textarea" rows=10/></textarea>
      ${getErrors(errors, "taskDescription")}
      <button class="button">Create Task</button>
      </form>
      </div>
    `,
  });
};


