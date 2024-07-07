# Secureu - Notes Management - Backend

This backend service is designed for a Notes Management System, enabling users to register, log in, and manage their personal notes. Built using Node.js, Express, and MongoDB, the backend provides a robust and RESTful API for seamless notes management. It includes secure authentication and authorization mechanisms to ensure that user data is protected and accessible only to authorized individuals.

## Features

- User Login/Signup
- Create, read, update, and delete notes.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   https://github.com/kunalVj/Secureu-Backend.git
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
   or
    ```bash
   npm install express mongoose bcryptjs express-session connect-mongo dotenv jsonwebtoken
   ```
4. Create a .env file in the root directory and add the following environment variables:
   ```bash
   Mongo_URI = Your_MongoDB_Connection_URI
   SESSION_SECRET = Your_Seceret_Key
   PORT = 5000
   JWT_SECRET = Your_JWT_Secret_key
   ```
5. Start server
   ```bash
   node server.js
   ```
   The server will start on http://localhost:5000.

## API Endpoints
- Register User
  ```bash
  POST "/api/auth/signup"
  ```
- Login User
  ```bash
  POST "/api/auth/login"
  ```
- Get notes for authenticated User
  ```bash
  GET "/api/notes"
  ```
- Create a new note
  ```bash
  POST "/api/notes"
  ```
- Update an existing note
  ```bash
  PUT "/api/notes/:id"
  ```
- Delete a note
  ```bash
  DELETE "/api/notes/:id"
  ```
- Logout User
  ```bash
  POST "/api/auth/logout"
  ```
