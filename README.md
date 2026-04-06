# Student Library Management System API

A comprehensive RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing a school library system. The system allows efficient management of authors, books, students, library attendants, and book borrowing/returning operations.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Testing with Postman](#testing-with-postman)
- [Features](#features)

---

## 🎯 Overview

This API provides complete library management functionality including:

- Author management
- Book catalog management
- Student registration and tracking
- Library attendant management
- Book borrowing and return tracking

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js (v5.2.1)
- **Database:** MongoDB with Mongoose (v9.3.3)
- **Environment:** dotenv (v17.3.1)
- **Dev Tools:** Nodemon (v3.1.14)
- **Module Type:** ES6 Modules

---

## 📁 Project Structure

```
student_library_system/
├── config/
│   └── database.js              # MongoDB connection configuration
├── controllers/
│   ├── authorController.js      # Author business logic
│   ├── bookController.js        # Book business logic
│   ├── studentController.js     # Student business logic
│   └── attendantController.js   # Library attendant business logic
├── models/
│   ├── Author.js                # Author schema
│   ├── Book.js                  # Book schema
│   ├── Student.js               # Student schema
│   └── LibraryAttendant.js       # Library attendant schema
├── routes/
│   ├── authorRoutes.js          # Author endpoints
│   ├── bookRoutes.js            # Book endpoints
│   ├── studentRoutes.js         # Student endpoints
│   └── attendantRoutes.js       # Attendant endpoints
├── server.js                    # Main server entry point
├── .env                         # Environment variables
├── package.json                 # Project dependencies
└── README.md                    # Documentation
```

**Architecture:** MVC Pattern

- **Models:** Define data structure and database schemas
- **Controllers:** Handle business logic and request processing
- **Routes:** Define API endpoints and connect them to controllers

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account (or local MongoDB)

### Step 1: Clone or Download the Project

```bash
cd student_library_system
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?ssl=true&replicaSet=atlas-xyz&authSource=admin&appName=LibrarySystem
```

**MongoDB Atlas Setup:**

1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Add a database user with username and password
3. Get the connection string from "Connect" → "Connect your application"
4. Replace `<username>`, `<password>`, and `<cluster>` in the URI

### Step 4: Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

**Expected Output:**

```
Server is running on port : 3000
MongoDB has connected successfully
```

---

## 📚 API Documentation

## **Postman Collection:** [View and Test API]https://jamaldeenusman-9807282.postman.co/workspace/74a06f7f-fbcd-4736-8fe7-d50b792fa3bb/documentation/52434386-45bfcf47-26b8-4e15-ad54-1dd365406798

## 📊 Database Models

### Author Model

```javascript
{
  name: String (required),
  bio: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Model

```javascript
{
  title: String (required),
  isbn: String (required),
  authors: [ObjectId] (reference to Author),
  status: String ("available" or "OUT"),
  borrowedBy: ObjectId (reference to Student),
  issuedBy: ObjectId (reference to Attendant),
  returnDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Student Model

```javascript
{
  name: String (required),
  email: String (required),
  studentId: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### LibraryAttendant Model

```javascript
{
  name: String (required),
  staffId: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Testing with Postman

### Step 1: Install Postman

Download from [postman.com/downloads](https://www.postman.com/downloads/)

### Step 2: Create Requests

1. Open Postman
2. Click **"+"** to create a new request
3. Select HTTP method (GET, POST, PUT, DELETE)
4. Enter the URL (e.g., `http://localhost:3000/authors`)

### Step 3: Add Request Body (for POST/PUT)

- Click **Body** tab
- Select **raw**
- Select **JSON** format
- Paste the JSON payload

### Step 4: Send Request

- Click **Send**
- View response in the lower panel

### Example Workflow

1. **Create Author:** POST `/authors` with name and bio
2. **Get Author ID from response**
3. **Create Book:** POST `/books` with the author ID
4. **Create Student:** POST `/students`
5. **Borrow Book:** POST `/books/{bookId}/borrow` with student ID
6. **Return Book:** POST `/books/{bookId}/return`

---

## ✨ Features

✅ Complete CRUD operations for all resources
✅ Book borrowing and return tracking
✅ Related data population (authors with books, etc.)
✅ Error handling with meaningful messages
✅ MongoDB database with timestamps
✅ RESTful API design
✅ MVC architecture pattern
✅ Environment-based configuration

---

## 📝 License

ISC License - School Library Management Assignment

---

## 👨‍💻 Author

**Usman Jamaldeen**

- Backend Development Assignment - TS Academy Phoenix Cohort
- GitHub: [jamaldeenusman4life](https://github.com/jamaldeenusman4life)

---

## 🤝 Support

For issues or questions, please create an issue in the [GitHub repository](https://github.com/jamaldeenusman4life/TSAssignment1_LibrarySystem).

---

**Happy coding! 🎉**
