module.exports = () =>{

    return `
    <div>
      <form method="POST">
      <label>Task name:</label>
      <input name="taskName" placeholder="task name" />
      <label>Task description</label>
      <textarea name="taskDescription" placeholder="Task description" /></textarea>
      <button>Create Task</button>
      </form>
      </div>
    
    `
}