# 📝 Task Manager App

A modern full-stack Task Manager application built using the MERN Stack. The application allows users to securely manage daily tasks with authentication, task categorization, analytics, search, filtering, sorting, and a Kanban board for improved productivity.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcryptjs

### 📋 Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- User-specific Task Management
- Task Status (To Do, In Progress, Completed)
- Task Priority (Low, Medium, High)
- Due Date Management

### 📊 Dashboard
- Personalized Welcome Dashboard
- Total Tasks
- To Do Tasks
- In Progress Tasks
- Completed Tasks
- Quick Statistics Cards

### 📈 Analytics
- Task Completion Analytics
- Priority Distribution
- Interactive Charts

### 📌 Kanban Board
- Drag and Drop Tasks
- Three Columns:
  - To Do
  - In Progress
  - Completed

### 🔍 Search, Filter & Sort
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort by Due Date
- Sort by Priority
- Sort Alphabetically

### 🎨 User Interface
- Responsive Design
- Modern Dashboard
- Beautiful Cards
- Task Modal
- Confirmation Dialog
- Loading Skeleton
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS
- Express Validator

---

# 📂 Folder Structure

```
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
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/pranjali-mali-ai/Syntecxhub_Task_Manager.git
```

```bash
cd Syntecxhub_Task_Manager
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

Start the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

# 👩‍💻 Author

**Pranjali Mali**

- GitHub: https://github.com/pranjali-mali-ai
- LinkedIn: https://www.linkedin.com/in/pranjali-mali-ai/

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project was developed for learning, internship, and portfolio purposes.
