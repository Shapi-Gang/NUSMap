# NUSMap Backend Setup Guide

```
src/
├── backend/
│   ├── config/          # Environment configurations and global settings
│   ├── controllers/     # Route controllers (or handlers)
│   ├── db/              # Database connection and model definitions
│   │   ├── models/      # Mongoose models (or schemas)
│   │   └── index.js     # Database connection setup
│   ├── middleware/      # Express middlewares (e.g., authentication, logging)
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic (services used by controllers)
│   ├── utils/           # Utility functions and helpers
│   └── app.js           # Entry point of the backend application
├── frontend/            # Frontend source files
```

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

Certainly, with the new directory structure, we'll place the database connection logic within the `db/` directory. Here's how you can update the MongoDB connection setup step in your `BACKEND_SETUP.md`:


## Step 4: Connect to MongoDB

Setting up a connection to MongoDB is a crucial step in enabling your application to interact with your database.

### Install Mongoose

First, you need to install Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js:

```sh
npm install mongoose
```

### Set Up MongoDB Connection

#### Create the Database Connection Logic

1. Navigate to the `backend/db/` directory.
2. Create a file named `index.js` within the `db/` directory.

#### Write the Database Connection Code

Add the following code to `backend/db/index.js` to establish the MongoDB connection using Mongoose:

```javascript
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config({ path: './backend/.env' });

// Retrieve the MongoDB connection string from the environment variable
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch((error) => console.error('MongoDB connection failed:', error.message));

// Export the mongoose connection
module.exports = mongoose;
```

#### Secure Your Connection String

To keep your connection string secure, store it in an environment variable:

1. In the root of your `backend` directory, create a `.env` file.
2. Add your MongoDB URI to the `.env` file like this:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<your_cluster_url>/<dbname>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, `<your_cluster_url>`, and `<dbname>` with your actual MongoDB credentials and information.

#### Integrate the Connection with Your Application

To use the database connection, import it at the beginning of your `app.js`:

```javascript
const db = require('./db');
```

### Test Your Database Connection

Run the following command to start your server:

```sh
npx nodemon backend/app.js
```

Look for a console message indicating a successful connection. If there are any connection issues, the error message will help diagnose the problem.


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
