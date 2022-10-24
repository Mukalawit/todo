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
        <label>Task name</label><input name="taskName" value="${
          item.name
        }" />${getErrors(errors, "taskName")} 
        <label>Task description</label><input name="taskDescription" value="${
          item.description
        }"/>${getErrors(errors, "taskDescription")}`;
  });

  return layout({
    content: `

    <form method="POST">${renderedItem}<button>Update</button></form>
    
    `,
  });
};
