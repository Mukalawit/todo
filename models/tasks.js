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

        return data;
       
      })
      .catch((error) => `${error}`);
  },

  updateTask(name , description , id) {
    client
      .query(`UPDATE tasks SET "name"=$1,"description"=$2 WHERE "id"=$3`, [
        name,
        description,
        id,
      ])
      .then((response) => {
        return response;
      });
  },

  showTaskToUpdate(id) {
    return client
      .query(`SELECT * FROM tasks WHERE id = $1`, [id])
      .then((response) => {
        const data = response.rows;

        return data;
        
      });
  },

  addTask(name , description) {
    client
      .query(`INSERT INTO tasks(name , description) VALUES($1,$2)`, [
        name,
        description
      ])
      .then((response) => {
        return response;
      });
  },
};
