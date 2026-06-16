import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  DashboardLayout,
  DashboardHome,
  InterviewHistory,
  Analytics,
  Profile,
  Settings,
  StartInterview,
  InterviewSession,
} from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          <Route path="interview/start" element={<StartInterview />} />
          <Route path="interview/session" element={<InterviewSession />} />

          <Route path="history" element={<InterviewHistory />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;