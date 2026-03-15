# Account Management System

A full stack account management system that allows users to create accounts, log in, transfer money to other users, and view their transaction history.

The project is built using:

- React (Frontend)
- Node.js + Express.js (Backend)
- Supabase PostgreSQL (Database)
- JWT Authentication

---

# Features

## User Authentication
- User Signup
- User Login
- Password hashing using bcrypt
- JWT based authentication
- Protected routes

## Account Dashboard
- Displays current account balance
- Quick access to send money
- Shows recent activity

## Send Money
- Transfer money between registered users
- Sender balance validation
- Receiver validation
- Automatic balance update

## Account Statement
- Shows transaction history
- Debit transactions (red)
- Credit transactions (green)
- Transaction date and amount

## Responsive UI
- Sidebar navigation
- Mobile hamburger menu
- Responsive layout

---

# Project Structure
account-management-system
│
├── frontend
│ ├── components
│ │ ├── Sidebar.jsx
│ │ └── ProtectedRoute.jsx
│ │
│ ├── context
│ │ └── AuthContext.jsx
│ │
│ ├── layout
│ │ └── DashboardLayout.jsx
│ │
│ ├── pages
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Dashboard.jsx
│ │ ├── SendMoney.jsx
│ │ └── Statement.jsx
│ │
│ ├── services
│ │ └── api.js
│ │
│ ├── App.jsx
│ └── main.jsx
│
└── backend
├── controllers
│ ├── authController.js
│ └── accountController.js
│
├── routes
│ ├── authRoutes.js
│ └── accountRoutes.js
│
├── middlewares
│ └── authMiddleware.js
│
├── config
│ └── supabaseClient.js
│
├── utils
│ └── generateToken.js
│
└── server.js


---

# Database Design

## Users Table

| Column | Type |
|------|------|
| id | UUID |
| name | text |
| email | text |
| password | text |
| balance | numeric |
| created_at | timestamp |

Default balance: 10000


---

## Transactions Table

| Column | Type |
|------|------|
| id | UUID |
| sender_id | UUID |
| receiver_id | UUID |
| amount | numeric |
| created_at | timestamp |

---

# API Routes

## Authentication Routes
 POST /api/auth/signup
 POST /api/auth/login

 ## Account Routes

    GET /api/account/balance
    GET /api/account/statement
    POST /api/account/transfer
    GET /api/account/users
