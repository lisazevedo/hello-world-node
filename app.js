const express = require('express');
const app = express();
const port = 3000;

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and listen on the specified port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
  });
}

module.exports = app;