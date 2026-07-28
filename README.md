# 📝 Task Manager App

A full-stack Task Manager application built using the MERN stack that helps users organize and manage their daily tasks efficiently. Users can securely register, log in, and perform complete CRUD operations on their tasks.

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

### 📋 Task Management
- Create Tasks
- View All Tasks
- Update Tasks
- Delete Tasks
- Task Ownership Protection (Users can access only their own tasks)

### 🎨 Frontend
- Responsive React UI
- Dashboard
- Task Cards
- Add/Edit Task Modal
- Navbar
- User-friendly Interface

### 🛠 Backend
- RESTful APIs
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Global Error Handling
- CORS Configuration

---

## 🏗 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

---

## 📂 Project Structure

```text
Task Manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/pranjali-mali-ai/Syntecxhub_Task_Manager.git
```

```bash
cd Syntecxhub_Task_Manager
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 👩‍💻 Author

**Pranjali Mali**

GitHub: https://github.com/pranjali-mali-ai

LinkedIn: https://www.linkedin.com/in/pranjali-mali-ai/

---

## 📄 License

This project is created for learning, internship, and portfolio purposes.
