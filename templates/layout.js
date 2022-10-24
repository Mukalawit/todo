module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <link rel='stylesheet' href='/css/main.css'>
    </head>
    <body>
    ${content}
    </body>
    </html>
    `;
};
