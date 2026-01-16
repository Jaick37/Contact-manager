# 📇 Contact Manager – Mini Full-Stack Application

A simple and secure full-stack contact management application built as part of a technical evaluation task.  
The app allows users to sign up, log in, and manage their personal contacts with full CRUD functionality.

---
For convenience during development, a single command is provided to run both the frontend and backend services together.
```bash
npm start

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- Plain CSS (clean, minimal UI)

### Backend
- Node.js
- Express.js

### Database
- Supabase (PostgreSQL)

### Authentication & Security
- Supabase Auth (Email & Password)
- JWT-based API authorization
- Row Level Security (RLS) for user data isolation

---

## ✨ Features

- User signup and login
- JWT-protected backend APIs
- Add, edit, delete contacts
- Search contacts by name, phone, or email
- Each user can access **only their own contacts**
- Clean and simple UI focused on usability

---

## 🗂️ Database Schema

### `contacts` table
| Column       | Type      | Description                  |
|-------------|-----------|------------------------------|
| id          | uuid      | Primary key                  |
| user_id     | uuid      | Authenticated user ID        |
| name        | text      | Contact name                 |
| phone       | text      | Contact phone number         |
| email       | text      | Contact email (optional)     |
| tag         | text      | Label (Family / Work, etc.)  |
| created_at | timestamp | Creation time                |
| updated_at | timestamp | Last update time             |

Row Level Security (RLS) ensures users can only read/write their own records.

---

## 🔐 API Endpoints

All endpoints are **JWT protected**.

