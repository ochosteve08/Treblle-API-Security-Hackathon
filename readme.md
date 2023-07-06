# Todo Task RESTful API

This is a  RESTful API built with Node.js and Express.js that allows authenticated users to perform CRUD operations on a "Todo" resource.

## Getting Started

To get started, you will need to install the following dependencies:

- npm install express
- npm install mongoose
- npm install dotenv
- npm install nodemon --D

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ochosteve08/API-Security-.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

By default, the server will run on `http://localhost:3500`.

## Setup Instructions

- Set up environment variables:
  - Create a `.env` file in the `main` directory.
  - Define the following variables:
    - `MONGO_URL`: MongoDB connection string.
    - `JWT_SECRET`: Secret key for JSON Web Tokens.
    - `TREBLLE_PROJECT_ID`: Project ID
    - `TREBLLE_API_KEY`: API key
    - `APP_PORT` : 3500
    - `APP_HOST` :<http://localhost>
  - Save the file.

## Todo Resource Schema

A todo resource has the following fields:

- `id`: The unique identifier of the todo (automatically generated).
- `title`: The title of the todo.
- `description`: The description of the todo.
- `completed`: A flag indicating whether the todo is completed or not.

## API Routes

The following API routes are available:

### User Routes

- **POST /api/v1/users/register**: Register a new user.
- **POST /api/v1/users/login**: Log in an existing user.

### Todo Routes

- **GET /api/v1/**: Get all todo lists.
- **GET /api/v1/todo/:id**: Get a todo item by user.
- **POST /api/v1/todo**: Create a new todo item by user
- **PUT /api/v1/todo/:id**: Update a todo item by user.
- **DELETE /api/v1/todo/:id**: Delete a todo item by user.

## Error Handling

The API implements proper error handling for various scenarios, such as invalid requests or server errors. Errors are returned in a consistent JSON format with appropriate status codes.

## Features

- User Registration: Users can create an account by providing their details such as username, email, and password.
- User Login: Registered users can log in using their credentials.

- Authentication: Authenticated users can access protected routes to create, fetch, update, and delete todo items.

- Create todo list: Authenticated users can create new todo list by providing details such as title, description.

- Update todo list: Authenticated users can update existing todo list by modifying the details such as title, description.

- Delete todo item: Authenticated users can delete a todo item from their list of todo list.

## Technologies Used

- MongoDB: Database for storing user information and workout plans.
- Express: Backend framework for handling HTTP requests and routing.
- Node.js: JavaScript runtime environment for running the server-side code.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- bcrypt: Used for hashing user passwords for security.
