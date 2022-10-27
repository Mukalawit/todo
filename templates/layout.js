module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <title>Task Manager</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css">
    <style>
    .nav-items{
      display:flex;
      justify-content:space-between;
    }
    </style>
    </head>
    
    <body>
    <div class="hero">
      <div class="notification is-info nav-items">
        <strong>TASK MANAGER</strong>
        <div class="">
        <a href="/" class="button">Add a Task</a>
        <a href="/tasks" class="button">View Tasks</a>
        </div>
      </div>
    </div>
    <div class="content">
    ${content}
    </div>
    </body>
    </html>
    `;
};
