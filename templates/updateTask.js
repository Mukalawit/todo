const layout = require("./layout");

const getErrors = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = (data, errors) => {
  const renderedItem = data.map((item) => {
    return `
        <label>Task name</label><input name="taskName" class="input" value="${
          item.name
        }" />${getErrors(errors, "taskName")} 
        <label>Task description</label><textarea class="textarea" name="taskDescription" rows="10">${
          item.description}</textarea>
        ${getErrors(errors, "taskDescription")}`;
  });

  return layout({
    content: `

    <form method="POST">${renderedItem}<button class="button">Update</button></form>
    
    `,
  });
};
