const layout = require("./layout");

module.exports = (data) => {
  const renderedItems = data
    .map((item) => {
      const str = item.name
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);
      return `
      <div class="column is-one-fifth">
      <div class="card">
          <header class="card-header is-primary">
            <p class="card-header-title">
            
               ${str2}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              ${item.description}
            </div>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item"><a href="/update/${item.id}" class="button">Edit</a></div>
            <div class="card-footer-item"><form method="POST" action='/delete/${item.id}'>
            <button class="button is-danger">Delete</button></form></div>
          </footer>
        </div>
        </div>
      `;




    })
    .join("");

  return layout({ content: `<div class="columns is-multiline">${renderedItems}</div>` });
};
