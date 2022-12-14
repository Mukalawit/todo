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
    let status = 1;
    return client
      .query(`SELECT * FROM tasks  WHERE "status" = $1 ORDER BY id DESC`,[status])
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
      
  },

  showTaskToUpdate(id) {
    let status = 1;
    return client
      .query(`SELECT * FROM tasks WHERE id = $1 AND status =$2`, [id , status])
      .then((response) => {
        const data = response.rows;

        return data;
        
      });
  },

  addTask(name , description) {
    let status = 1;
    client
      .query(`INSERT INTO tasks(name , description , status) VALUES($1,$2,$3)`, [
        name,
        description,
        status
      ])
      .then((response) => {
        return response;
      });
  },
  deleteTask(id){
    let status = 0;
    client.query(`UPDATE tasks SET "status" = $1 WHERE "id" = $2 RETURNING id`,[status , id]).then(response=>response.rows)
    
  }
};
