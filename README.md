# Meow Todo App

A modern Todo application with user authentication built with Express.js, Prisma ORM, and PostgreSQL.

## Features

- 🔐 User authentication (register/login)
- ✅ Todo management (create, read, update, delete)
- 🔄 User-specific todos
- 🐳 Docker containerization
- 🗄️ PostgreSQL database with Prisma ORM

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, bcryptjs
- **Containerization**: Docker, Docker Compose

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

## Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Condition00/meow.git
cd meow
```

### Environment Variables

The application uses environment variables for configuration. These are automatically set in the Docker Compose file, but if you want to run the application without Docker, create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todoapp
JWT_SECRET=your_jwt_secret_key
PORT=5003
```

### Using Docker (Recommended)

1. Build and start the containers:

```bash
docker-compose up
```

This will start both the application and PostgreSQL database containers.

### Manual Setup

1. Install dependencies:

```bash
npm install
```

2. Run Prisma migrations to set up the database:

```bash
npx prisma migrate dev
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- **POST /auth/register** - Register a new user
  - Body: `{ "username": "user", "password": "password" }`

- **POST /auth/login** - Login with existing credentials
  - Body: `{ "username": "user", "password": "password" }`

### Todos (Protected Routes - Require Authentication)

- **GET /todos** - Get all todos for the authenticated user

- **POST /todos** - Create a new todo
  - Body: `{ "title": "New Todo" }`

- **PUT /todos/:id** - Update a todo's status
  - Body: `{ "completed": true }`

- **DELETE /todos/:id** - Delete a todo

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
