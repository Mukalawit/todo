const layout = require("./layout");

module.exports = (data) => {
  const renderedItems = data
    .map((item) => {
      return `<li>Task name:${item.name} Task Description:${item.description} <a href='/update/${item.id}'>Edit</a></li>`;
    })
    .join("");

  return layout({ content: `<ul>${renderedItems}</ul>` });
};
