# Project Documentation (InterviewAI - Client/Server Auth)

This project is a minimal **authentication demo** with:

- a **React (Vite) frontend** (`client/`)
- an **Express + MongoDB backend** (`server/`)

It supports:

- **User signup**: store `{ name, email, password }` in MongoDB
- **User signin**: look up by `email` and compare the provided `password`
- **Navigation**: `/signup` → `/signin` → `/home`

> Important: passwords are currently stored and compared as **plain text** (no hashing). Treat this as a learning/demo project, not production-ready.

---

## 1) High-level architecture

### Folder layout

- `server/`
  - `index.js` — Express server + API endpoints
  - `models/Employee.js` — Mongoose schema/model
- `client/`
  - `src/main.jsx` — React entry point
  - `src/App.jsx` — routes
  - `src/Signup.jsx` — signup UI + POST `/signup`
  - `src/Signin.jsx` — signin UI + POST `/signin`
  - `src/Home.jsx` — home UI (static content)

---

## 2) Backend (server/)

### 2.1 Dependencies

From `server/package.json`, the backend uses:

- `express` — HTTP server
- `mongoose` — MongoDB connection + models
- `cors` — enables cross-origin requests (from the React dev server)
- `dotenv` — loads `MONGO_URI` from environment

### 2.2 Server startup and middleware (`server/index.js`)

Key code flow:

1. **Load environment variables**
   ```js
   require("dotenv").config();
   ```
2. **Create Express app**
   ```js
   const app = express();
   ```
3. **Parse JSON bodies**
   ```js
   app.use(express.json());
   ```
4. **Enable CORS**
   ```js
   app.use(cors());
   ```
5. **Connect to MongoDB**
   ```js
   mongoose
     .connect(process.env.MONGO_URI)
     .then(() => console.log("Connected to MongoDB"));
   ```
6. **Start listening** on port **3001**
   ```js
   app.listen(3001, () => {
     console.log("Server is running on port 3001");
   });
   ```

#### Environment requirement

- You must define `MONGO_URI` for MongoDB connection.

---

### 2.3 Data model (`server/models/Employee.js`)

The Mongo collection/model is `Employee`.

Schema fields:

- `name`
  - `String`
  - `required: true`
  - `trim: true`
- `email`
  - `String`
  - `required: true`
  - `unique: true`
  - `lowercase: true`
  - `trim: true`
- `password`
  - `String`
  - `required: true`
  - `minlength: 6`

Also enabled:

- `timestamps: true` → adds `createdAt` / `updatedAt`

---

### 2.4 API endpoints

#### POST `/signup`

Defined in `server/index.js`.

**Request body expected from client:**

```json
{ "name": "...", "email": "...", "password": "..." }
```

**Server behavior:**

1. Logs incoming data:
   ```js
   console.log("Received:", req.body);
   ```
2. Creates a Mongo document:
   ```js
   Employee.create(req.body);
   ```
3. On success:
   - logs saved employee
   - returns created employee document
4. On error:
   - logs Mongo error
   - returns HTTP 500 with the error object

**Important note:**

- No password hashing.
- If `email` already exists, Mongo unique constraint may trigger an error (handled as 500 currently).

**Response (success):**

- `res.json(employee)` — the created Mongoose document

---

#### POST `/signin`

Defined in `server/index.js`.

**Request body expected from client:**

```json
{ "email": "...", "password": "..." }
```

**Server behavior:**

1. Extracts credentials:
   ```js
   const { email, password } = req.body;
   ```
2. Finds employee by email:
   ```js
   Employee.findOne({ email: email });
   ```
3. If a user exists (`employee` is truthy):
   - compares passwords directly:
     ```js
     if(employee.password === password)
     ```
   - if match: `res.json("Success")`
   - else: HTTP 401 with `{ message: "Invalid credentials" }`
4. If user does not exist:
   - HTTP 404 with `{ message: "Employee not found" }`

**Response (success):**

- JSON string: `"Success"`

---

### 2.5 End-to-end backend flow

1. **Signup**
   - React sends `POST /signup`
   - Express stores a new `Employee` document in MongoDB
2. **Signin**
   - React sends `POST /signin`
   - Express loads the user by `email`
   - Express compares the plaintext password
   - On match, client navigates to `/home`

---

## 3) Frontend (client/)

### 3.1 Dependencies

From `client/package.json`, the frontend uses:

- `react`, `react-dom`
- `react-router-dom` for routing
- `axios` for HTTP calls to the backend
- `tailwindcss` (via Vite plugin) for styling
- `lucide-react` for icons

### 3.2 React entry point (`client/src/main.jsx`)

Creates the React root and renders `<App />` inside `StrictMode`.

---

### 3.3 Routing (`client/src/App.jsx`)

Uses `BrowserRouter` + `Routes/Route`:

- `/signup` → `<Signup />`
- `/signin` → `<Signin />`
- `/home` → `<Home />`

---

## 4) Signup page (`client/src/Signup.jsx`)

### 4.1 UI behavior

- Tracks form state with React `useState`:
  - `name`
  - `email`
  - `password`
- On form submit (`onSubmit={handleSubmit}`):
  - prevents default
  - sends request to backend

### 4.2 Network request

On submit, it calls:

```js
axios.post("http://localhost:3001/signup", { name, email, password });
```

### 4.3 Response handling

- Logs the result:
  ```js
  console.log(result);
  ```
- Navigates to signin page:
  ```js
  navigate("/signin");
  ```
- Errors are logged to console.

---

## 5) Signin page (`client/src/Signin.jsx`)

### 5.1 UI behavior

- Tracks:
  - `email`
  - `password`
- On form submit:
  - prevents default
  - posts credentials to backend

### 5.2 Network request

```js
axios.post("http://localhost:3001/signin", { email, password });
```

### 5.3 Response handling

- The code checks:
  ```js
  if (result.data === "Success") {
    navigate("/home");
  }
  ```

If signin fails, the error is printed:

```js
.catch((err) => console.log(err))
```

---

## 6) Home page (`client/src/Home.jsx`)

A simple static view:

- renders a centered message: “Welcome to the Home Page!”
- no API calls

---

## 7) Full user journey (what happens end-to-end)

1. User visits **`/signup`**
2. User enters `name`, `email`, `password`
3. Client sends **`POST http://localhost:3001/signup`**
4. Server creates `Employee` in MongoDB
5. Client navigates to **`/signin`**
6. User enters `email`, `password`
7. Client sends **`POST http://localhost:3001/signin`**
8. Server finds user by `email`
9. Server compares plaintext passwords
10. If match, server responds `"Success"`
11. Client navigates to **`/home`**

---

## 8) Notes / current limitations (based on current code)

1. **No session/auth token**
   - There is no JWT/cookie-based authentication.
   - Anyone can visit `/home` directly via URL.
2. **Plaintext password storage and comparison**
   - `Employee.create(req.body)` stores `password` as-is
   - `/signin` compares `employee.password === password`
3. **Error handling is minimal**
   - Signup errors (e.g., duplicate email) return 500.
4. **Hardcoded backend URL**
   - Frontend directly calls `http://localhost:3001/...`.
   - For production or different ports, this would need configuration.

---

## 9) How to run (suggested)

### Run backend

In `server/`:

- `npm install`
- `npm start`

Backend listens on **http://localhost:3001**.

### Run frontend

In `client/`:

- `npm install`
- `npm run dev`

Frontend should be able to call backend thanks to `cors()`.

---

## 10) Key files reference

- `server/index.js`
  - Express setup, Mongo connect, `/signup`, `/signin`, server start on 3001
- `server/models/Employee.js`
  - Mongoose schema for stored users
- `client/src/App.jsx`
  - Routes: `/signup`, `/signin`, `/home`
- `client/src/Signup.jsx`
  - POST `/signup`
- `client/src/Signin.jsx`
  - POST `/signin` and navigates to `/home` on `"Success"`
- `client/src/Home.jsx`
  - Static home page
