const dotenv = require("dotenv");
const { Client } = require("pg");
dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect();

module.exports = {
  viewTasks() {
    return client
      .query(`SELECT * FROM tasks ORDER BY id ASC`)
      .then((response) => {
        const data = response.rows;
        const renderedItems = data
          .map((item) => {
            return `<li>Task name:${item.name}</li>`;
          })
          .join("");

        return `<ul>${renderedItems}</ul>`;
      })
      .catch((error) => `${error}`);
  },

  updateTask(req, res) {
    client
      .query(`UPDATE tasks SET "name"=$1,"description"=$2 WHERE "id"=$3`, [
        req.body.taskName,
        req.body.taskDescription,
        req.params.id,
      ])
      .then((response) => {
        res.redirect("/tasks");
      });
  },

  showTaskToUpdate(req, res) {
    return client
      .query(`SELECT * FROM tasks WHERE id = $1`, [req.params.id])
      .then((response) => {
        const data = response.rows;
        const renderedItem = data.map((item) => {
          return `<label>Task name<input name="taskName" value="${item.name}" /> <label>Task description</label><textarea name="taskDescription" />${item.description}</textarea>`;
        });

        res.send(
          `<form method="POST">${renderedItem}<button>Update</button></form>`
        );
      });
  },

  addTask(req, res) {
    client
      .query(`INSERT INTO tasks(name , description) VALUES($1,$2)`, [
        req.body.taskName,
        req.body.taskDescription,
      ])
      .then((response) => {
        res.redirect("/tasks");
      });
  },
};
