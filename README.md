# SecureRBAC

SecureRBAC is a role-based access control application with a React frontend and an Express/MongoDB backend. Users can register, log in, manage their profile and password, and access admin-only user management and statistics pages.

## Stack

- Frontend: React, React Router, Vite
- Backend: Node.js, Express, Mongoose
- Authentication: JWT stored in an HTTP-only cookie
- Database: MongoDB

## Requirements

- Node.js 18 or newer
- npm
- A running MongoDB instance

## Setup

### 1. Configure the backend

Create `backend/.env`:

```env
LOCAL_MONGODB_URL=mongodb://127.0.0.1:27017/securerbac
JWT_SECRET=replace-with-a-long-random-secret
PORT=3000
```

Install dependencies and start the API:

```bash
cd backend
npm install
node server.js
```

The API runs at `http://localhost:3000` by default.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

The backend CORS configuration currently allows requests from `http://localhost:5173` and enables credentials for authentication cookies.

## Available Pages

- `/` - Public home page
- `/login` - Login
- `/register` - Registration
- `/dashboard` - Authenticated user dashboard
- `/profile` - Authenticated user profile
- `/change-password` - Authenticated password change page
- `/admin` - Admin dashboard
- `/admin/users` - Admin user management

## API Routes

### Public and authentication routes

| Method | Route                   | Access        |
| ------ | ----------------------- | ------------- |
| `GET`  | `/api/public/home`      | Public        |
| `GET`  | `/api/public/posts`     | Public        |
| `GET`  | `/api/public/posts/:id` | Public        |
| `POST` | `/api/auth/register`    | Public        |
| `POST` | `/api/auth/login`       | Public        |
| `POST` | `/api/auth/logout`      | Authenticated |
| `GET`  | `/api/auth/me`          | Authenticated |

### User routes

| Method | Route                | Access        |
| ------ | -------------------- | ------------- |
| `GET`  | `/api/user/profile`  | Authenticated |
| `PUT`  | `/api/user/profile`  | Authenticated |
| `PUT`  | `/api/user/password` | Authenticated |

### Admin routes

| Method   | Route                       | Access |
| -------- | --------------------------- | ------ |
| `GET`    | `/api/admin/users`          | Admin  |
| `GET`    | `/api/admin/users/:id`      | Admin  |
| `DELETE` | `/api/admin/users/:id`      | Admin  |
| `PATCH`  | `/api/admin/users/:id/role` | Admin  |
| `GET`    | `/api/admin/stats`          | Admin  |

## User Roles

Users have one of two roles:

- `USER` - Default role for registered users
- `ADMIN` - Can access admin routes and pages

Make sure MongoDB is running before starting the backend. The backend will exit if it cannot connect to the configured database.

## Development Commands

From `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```
