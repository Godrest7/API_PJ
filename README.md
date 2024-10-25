# API_PJ

Here's a detailed README.md file for your project:

Users API
A RESTful API built with Node.js, Express, and SQLite, designed for managing users. This API allows you to perform CRUD (Create, Read, Update, Delete) operations on a users database.

Table of Contents
Features
Prerequisites
Installation
Usage
API Endpoints
Project Structure
License
Features
CRUD Operations: Add, retrieve, update, and delete users.
SQLite Database: Persistent data storage in a local SQLite database.
Modular Design: Organized code structure with separate files for routing, database management, and controllers.
Prerequisites
Node.js (version 12 or higher)
npm or yarn
Installation
Clone the repository:

bash
Copier le code
git clone https://github.com/yourusername/users-api.git
cd users-api
Install dependencies:

bash
Copier le code
npm install
Start the server:

bash
Copier le code
npm start
The server will start at http://localhost:3000.

Usage
Use tools like Postman or curl to test the API endpoints.

API Endpoints
Method	Endpoint	Description
GET	/api/users	Retrieve all users
GET	/api/users/:id	Retrieve a single user by ID
POST	/api/users	Create a new user
PUT	/api/users/:id	Update an existing user by ID
DELETE	/api/users/:id	Delete a user by ID
Example Requests
GET /api/users
Fetch all users.

json
Copier le code
// Response
[
    {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe"
    },
    {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Smith"
    }
]
POST /api/users
Add a new user.

json
Copier le code
// Request Body
{
    "firstName": "Alice",
    "lastName": "Johnson"
}

// Response
{
    "id": 3,
    "firstName": "Alice",
    "lastName": "Johnson"
}
PUT /api/users/:id
Update an existing user.

json
Copier le code
// Request Body
{
    "firstName": "Alice",
    "lastName": "Johnson"
}

// Response
{
    "msg": "Utilisateur mis à jour",
    "userId": 3,
    "firstName": "Alice",
    "lastName": "Johnson"
}
DELETE /api/users/:id
Delete a user.

json
Copier le code
// Response
{
    "msg": "Utilisateur supprimé"
}
Project Structure
bash
Copier le code
users-api/
│
├── routes/
│   └── users.js           # User routes
├── controllers/
│   └── usersControllers.js # User controller functions
├── database.js            # SQLite database connection and table creation
├── app.js                 # Main application file
└── README.md              # Project documentation
License
This project is licensed under the MIT License. See LICENSE for details.

