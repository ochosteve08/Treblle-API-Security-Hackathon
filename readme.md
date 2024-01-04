# Task Management API

This is a  Task Management API built with Node.js and Express.js that allows authenticated users to perform various operations on a "task" resource.

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
    - `APP_HOST` :[http://localhost](http://localhost)
  - Save the file.

## Task Schema

A task resource has the following fields:

- `id`: The unique identifier of the task (automatically generated).
- `title`: The title of the task.
- `description`: The description of the task.
- `completed`: A flag indicating whether the task is completed or not.

## API Routes

The following API routes are available:

### User Routes

- **POST /api/v1/users/register**: Register a new user.
- **POST /api/v1/users/login**: Log in an existing user.

### Task Routes

- **GET /api/v1/tasks**: Get all task lists.
- **GET /api/v1/tasks/:id**: Get a task item by user.
- **POST /api/v1/tasks**: Create a new task item by user
- **PUT /api/v1/tasks/:id**: Update a task item by user.
- **DELETE /api/v1/tasks/:id**: Delete a task item by user.

## Error Handling

The API implements proper error handling for various scenarios, such as invalid requests or server errors. Errors are returned in a consistent JSON format with appropriate status codes.

## Features

- User Registration: Users can create an account by providing their details such as username, email, and password.
- User Login: Registered users can log in using their credentials.
- Authentication: Authenticated users can access protected routes to create, fetch, update, and delete tasks.
- Create a task: Authenticated users can create new task by providing details such as title, description.
- Update a task: Authenticated users can update existing task by modifying the details such as title, description and also upon completion of task.
- Delete a task: Authenticated users can delete a task from their list of tasks.

## Technologies Used

- MongoDB: Database for storing user information and workout plans.
- Express: Backend framework for handling HTTP requests and routing.
- Node.js: JavaScript runtime environment for running the server-side code.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- bcrypt: Used for hashing user passwords for security.

## Documentation

### Swagger Documentation

Access the Swagger documentation for the API by visiting [production url](https://task-management-16d6.onrender.com/api/v1/docs/). This interactive documentation provides details about available endpoints, request parameters, and response formats.

You can also download the Swagger JSON file directly from [swagger json](https://task-management-16d6.onrender.com/api/v1/docs/.json).

### Postman Documentation

Explore the Postman documentation to interact with the API. Visit

the [Postman Documentation](https://documenter.getpostman.com/view/25943148/2s9YeEcsJm) to find detailed information about the API requests, examples, and usage.

License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
