const layout = require("./layout");

module.exports = (data) => {
  const renderedItems = data
    .map((item) => {
      return `<li ><strong>Task name:</strong>${item.name} <strong>Task Description:</strong>${item.description}
      <div class="list-actions"><a href='/update/${item.id}' class="button is-primary">Edit</a>
      <form method="POST" action='/delete/${item.id}'><button class="button is-danger">delete</button></form></div>
      <div class="card">
      <!--
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
      -->
    </div>
      </li>`;
    })
    .join("");

  return layout({ content: `<ol class="list-item">${renderedItems}</ol>` });
};
