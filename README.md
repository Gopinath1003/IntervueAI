# 🤖 IntervueAI

AI-Powered Mock Interview Platform

IntervueAI is a full-stack AI-powered interview preparation platform that helps students and job seekers practice technical interviews through role-specific questions, voice-enabled responses, AI evaluation, performance analytics, and interview history tracking.

---

## 🚀 Live Demo

Frontend: [Add Vercel Link Here]

Backend: [Add Render Link Here]

---

## 📌 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Logout

### 🎯 Role-Based Interviews

Choose from multiple interview roles:

* Java Developer
* Python Developer
* React Developer
* Data Analyst
* And more...

### 🤖 AI Question Generation

* Dynamic interview questions generated using Gemini AI
* Role-specific technical questions
* Realistic interview experience

### 🎤 Voice Interview Support

* Speech-to-Text using Web Speech API
* Voice-based answering
* Real-time transcription

### 📊 AI Evaluation

After each interview:

* Overall Score
* Strengths
* Weaknesses
* Improvement Suggestions

### 📈 Analytics Dashboard

* Total Interviews
* Average Score
* Best Performing Role
* Performance Trend Charts

### 📚 Interview History

* View previous interviews
* Review scores and feedback
* Track long-term improvement

### ⚙️ Settings & Profile

* User Profile Management
* Password Management
* Interview Preferences
* Account Settings

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js
* JWT Authentication
* Mongoose

### Database

* MongoDB Atlas

### AI Integration

* Google Gemini API

### Speech Recognition

* Web Speech API

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
IntervueAI
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── layouts
│   │   ├── routes
│   │   ├── context
│   │   └── App.jsx
│   │
│   └── public
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── config
│   └── server.js
│
└── README.md
```

---

## 🗄️ Database Design

### User

```javascript
{
  name,
  email,
  password,
  createdAt
}
```

### Interview

```javascript
{
  userId,
  role,
  questions,
  overallScore,
  strengths,
  weaknesses,
  suggestions,
  createdAt
}
```

---

# 📸 Screenshots

## Landing Page

[Add Screenshot Here]

---

## Sign Up Page

[Add Screenshot Here]

---

## Login Page

[Add Screenshot Here]

---

## Dashboard

[Add Screenshot Here]

---

## Start Interview

[Add Screenshot Here]

---

## AI Question Generation

[Add Screenshot Here]

---

## Interview Session

[Add Screenshot Here]

---

## Voice Interview Mode

[Add Screenshot Here]

---

## AI Evaluation Result

[Add Screenshot Here]

---

## Interview History

[Add Screenshot Here]

---

## Analytics Dashboard

[Add Screenshot Here]

---

## Profile Page

[Add Screenshot Here]

---

## Settings Page

[Add Screenshot Here]

---

# 🔄 Application Workflow

```text
User Registration/Login
            │
            ▼
      Dashboard
            │
            ▼
    Select Interview Role
            │
            ▼
   Generate AI Questions
            │
            ▼
   Answer via Text/Voice
            │
            ▼
      AI Evaluation
            │
            ▼
   Save Interview Results
            │
            ▼
 History & Analytics
```

---

# 🔐 Environment Variables

### Backend (.env)

```env
PORT=3001

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Frontend (.env)

```env
VITE_API_URL=YOUR_BACKEND_URL
```

---

# ⚙️ Installation

### Clone Repository

```bash
git clone <your_repo_url>

cd IntervueAI
```

---

### Backend Setup

```bash
cd server

npm install

npm run dev
```

---

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# Future Improvements

* Resume-Based Interviews
* AI Follow-Up Questions
* Behavioral Interview Rounds
* PDF Performance Reports
* Company-Specific Interview Preparation
* Interview Difficulty Levels
* Leaderboards
* Personalized Learning Paths

---

# Resume Highlights

### Key Achievements

* Built a complete MERN Stack application from scratch
* Integrated Gemini AI for dynamic question generation and answer evaluation
* Implemented JWT Authentication and Protected Routes
* Added Voice Interview functionality using Web Speech API
* Developed Interview Analytics Dashboard with Recharts
* Created Interview History Tracking and Performance Monitoring
* Deployed application using Vercel and Render

---

# Author

### Gopi

Computer Science Engineering Student

Project: IntervueAI – AI Mock Interview Platform

GitHub: [Add GitHub Profile]

LinkedIn: [Add LinkedIn Profile]

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
