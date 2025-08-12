
    // controllers/helloController.js

    // Define the controller function
    const getHelloWorld = (req, res) => {
      res.send('Hello World!');
    };

    // Export the controller function
    module.exports = {
      getHelloWorld,
    };
    