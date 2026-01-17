````md
# 📇 Contact Manager – Mini Full-Stack Application

A simple and secure full-stack contact management application.
The application allows users to sign up, log in, and manage their personal contacts with full CRUD functionality.

---

## 🚀 Running the Application

### Run both frontend and backend together (recommended)
For convenience during development, a single command is provided to run both the frontend and backend services simultaneously:

```bash
npm start
````

This starts:

* Frontend at `http://localhost:5173`
* Backend API at `http://localhost:5000`

### Run frontend and backend separately (alternative)

**Backend**

```bash
cd backend
npm install
npm start
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Axios
* Plain CSS (clean, minimal UI)

### Backend

* Node.js
* Express.js

### Database

* Supabase (PostgreSQL)

### Authentication & Security

* Supabase Auth (Email & Password)
* JWT-based API authorization
* Row Level Security (RLS) for user data isolation

---

## ✨ Features

* User signup and login
* Secure session handling using JWT
* Add, edit, delete contacts
* Search contacts by name, phone, or email
* Contacts displayed in alphabetical order (A–Z) by name
* Each user can access **only their own contacts**
* Logout functionality to securely end sessions
* Clean and intuitive UI focused on usability

---

## 🗂️ Database Schema

### `contacts` table

| Column     | Type      | Description                     |
| ---------- | --------- | ------------------------------- |
| id         | uuid      | Primary key                     |
| user_id    | uuid      | Authenticated user ID           |
| name       | text      | Contact name                    |
| phone      | text      | Contact phone number            |
| email      | text      | Contact email (optional)        |
| tag        | text      | Label (Family / Friends / Work) |
| created_at | timestamp | Creation timestamp              |
| updated_at | timestamp | Last updated timestamp          |

Row Level Security (RLS) ensures users can only read or modify their own contact records.

---

## 🔐 Backend API Endpoints

All API endpoints are protected using JWT authentication.

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| POST   | `/api/contacts`     | Create a new contact            |
| GET    | `/api/contacts`     | Fetch all contacts (searchable) |
| PUT    | `/api/contacts/:id` | Update an existing contact      |
| DELETE | `/api/contacts/:id` | Delete a contact                |

---

## 🔑 JWT Validation

After successful login, Supabase issues a JWT token.
The frontend attaches this token to every protected API request using the `Authorization` header.

The backend:

* Extracts the JWT from `Authorization: Bearer <token>`
* Verifies the token using Supabase public keys
* Uses the authenticated user ID (`sub`) from the token to scope database queries

Requests with missing or invalid tokens are rejected with appropriate HTTP errors (401/403).

---

## 📌 Example API Request

```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---
---

## 📝 Notes & Assumptions

* Supabase Auth is used instead of custom authentication for simplicity and security.
* Backend endpoints validate JWT on every request.
* Contacts are strictly scoped to the authenticated user using RLS and server-side checks.
* The application is intended for development and evaluation purposes.

```
```
