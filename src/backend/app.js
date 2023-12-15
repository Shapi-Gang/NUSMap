// Importing the express module
const express = require('express');
// Creating an instance of the express application
const app = express();

// Setting up a route for the root URL
app.get('/', (req, res) => {
    res.send('NUSMap Backend is running!');
});

// Defining the port number for the server to listen on
const PORT = process.env.PORT || 3000;
// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});