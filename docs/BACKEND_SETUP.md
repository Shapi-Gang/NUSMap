# NUSMap Backend Setup Guide

## Step 1: Set Up Your Backend Environment

### Install Node.js and npm
- Download and install Node.js from [nodejs.org](https://nodejs.org/).
- npm (Node Package Manager) comes with Node.js, so there's no need for a separate installation.

### Initialize Your Node.js Project
- Open your terminal.
- Navigate to your project’s root directory.
- Run the initialization command:
  ```sh
  npm init -y
  
  This will create a `package.json` file with default settings.

## Step 2: Install Required Packages

### Express Framework
- Install Express, which is a minimal and flexible Node.js web application framework:
  ```sh
  npm install express

### MongoDB Driver
- Install the MongoDB driver:
  ```sh
  npm install mongodb
  ```
  - Optionally, if you prefer using Mongoose for object modeling, run:
    ```sh
    npm install mongoose
    ```

### Other Useful Packages
- Install Nodemon for development to automatically restart the server on file changes:
  ```sh
  npm install --save-dev nodemon
  ```
- Install Dotenv to manage environment variables:
  ```sh
  npm install dotenv
  ```

## Step 3: Set Up Express Server

### Create a Server File
- Inside the `backend` directory, create a file named `app.js`.
- Set up a basic Express server by adding the following code to `app.js`:
  ```javascript
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
    res.send('NUSMap Backend is running!');
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  ```

### Run Your Server
- Use the following command to start your server with Nodemon:
  ```sh
  npx nodemon app.js
  ```
- Open a browser and go to `http://localhost:3000`. You should see a message indicating that the NUSMap Backend is running.

Certainly! Below is a more detailed guide for Step 4, which you can include in your `BACKEND_SETUP.md` file.

## Step 4: Connect to MongoDB

Connecting your Node.js application to MongoDB is crucial for storing and retrieving your application data. Follow these detailed steps to establish a connection using Mongoose, which provides a higher-level API for interacting with your MongoDB instance.

### Install Mongoose

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. To install Mongoose, run the following command in your terminal:

```sh
npm install mongoose
```

### Set Up MongoDB Connection

#### Create a Database Connection File

1. In the `backend` directory, create a new file named `db.js`.
2. Open `db.js` in your text editor.

#### Write the Connection Code

Add the following code to `db.js` to set up the database connection:

```javascript
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// Retrieve the connection string from the environment variable
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch((error) => console.error('MongoDB connection failed:', error.message));

// Export the connection
module.exports = mongoose.connection;
```

#### Secure Your Connection String

Storing your MongoDB connection URI in your source code is not secure. Instead, use a `.env` file to manage your environment variables.

1. In the root of your backend directory, create a file named `.env`.
2. Add the following line to the `.env` file, replacing `<your_mongodb_uri>` with your actual MongoDB URI:

```env
MONGODB_URI=<your_mongodb_uri>
```

#### Use the Connection in Your Application

In your main server file (usually `app.js` or `server.js`), require the `db.js` file to ensure the database connection is established when your server starts.

Add this line to the top of your server file:

```javascript
const db = require('./db');
```

### Test Your Database Connection

To test if your connection works:

1. Start your server by running `nodemon` or `node app.js`.
2. Check your terminal for the "MongoDB connection established" message.

If there are any issues, the error message will provide more insight into what went wrong, allowing you to troubleshoot the connection.


## Step 5: Define Routes and Models

### Create Models
- Define the data schema for bus stops and routes.
- If using Mongoose, create model definitions that correspond to the data structure.

### Set Up API Routes
- Create a new directory called `routes`.
- Inside `routes`, define files for each set of related routes (e.g., `busRoutes.js`, `stops.js`).
- Implement CRUD operations within these route files.

## Step 6: Implementing Logic

### Write Backend Logic
- For each route handler, write the logic to interact with the database and process API requests.

## Step 7: Testing

### Test Your APIs
- Use Postman or Insomnia to send requests to your API endpoints and validate the responses.

## Step 8: Documentation

### Document Your API
- Create a `docs` directory.
- Inside `docs`, create a markdown file (e.g., `API_DOCS.md`) to document your API endpoints.

## Step 9: Version Control

### Commit Your Changes
- Use Git to commit your changes regularly.
- Push your commits to a remote repository like GitHub for collaboration and backup.
