const layout = require("./layout");

module.exports = (data) => {
  const renderedItems = data
    .map((item) => {
      return `<li>Task name:${item.name} Task Description:${item.description} <a href='/update/${item.id}' class="button is-primary">Edit</a>
      <form method="POST" action='/delete/${item.id}'><button class="button is-danger">delete</button></form></li>`;
    })
    .join("");

  return layout({ content: `<ul>${renderedItems}</ul>` });
};
