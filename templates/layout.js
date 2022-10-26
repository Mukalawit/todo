module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Task Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css">
    
    </head>
    
    <body>
    <div class="hero">
      <div class="notification is-info">
        <strong>TASK MANAGER</strong>
        <a href="/">Add a Task</a>
        <a href="/tasks">View Tasks</a>
      </div>
    </div>
    <div class="content">
    ${content}
    </div>
    </body>
    </html>
    `;
};
