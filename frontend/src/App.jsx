// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";

// Public Pages
import Home from "./pages/Home";

// Student Panel
import StudentPanel from "./pages/student/StudentPanel";
import AddStudent from "./pages/student/AddStudent";
import EditStudent from "./pages/student/EditStudent"; 
import StudentList from "./pages/student/StudentList"; 

// Owner Panel
import OwnerDashboard from "./pages/owner/Dashboard";
import CreateSchool from "./pages/owner/CreateSchool";
import ListSchools from "./pages/owner/ListSchools";
import EditSchool from "./pages/owner/EditSchool";

// Context Providers
import { OwnerAuthProvider, OwnerAuthContext } from "./context/OwnerAuthContext";
import { SchoolAuthProvider, SchoolAuthContext } from "./context/SchoolPanelAuthContext";

// Route protection components
const OwnerProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(OwnerAuthContext);
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/" />;
};

const SchoolProtectedRoute = ({ children }) => {
  const { schoolUser, loading } = useContext(SchoolAuthContext);
  if (loading) return <p>Loading...</p>;
  return schoolUser ? children : <Navigate to="/" />;
};

function App() {
  // Wake up backend on frontend load
  useEffect(() => {
    const wakeBackend = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ping`);
        console.log("Backend woke up!");
      } catch (err) {
        console.error("Failed to wake backend:", err);
      }
    };

    wakeBackend(); // Call immediately

    const interval = setInterval(wakeBackend, 5 * 60 * 1000); // Repeat every 5 min
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <OwnerAuthProvider>
      <SchoolAuthProvider>
        <Router>
          <Routes>
            {/* Public/Homepage */}
            <Route path="/" element={<Home />} />

            {/* Student Panel */}
            <Route
              path="/student/dashboard"
              element={
                <SchoolProtectedRoute>
                  <StudentPanel />
                </SchoolProtectedRoute>
              }
            />
            <Route
              path="/student/add"
              element={
                <SchoolProtectedRoute>
                  <AddStudent />
                </SchoolProtectedRoute>
              }
            />
            <Route
              path="/student/edit-student/:id"
              element={
                <SchoolProtectedRoute>
                  <EditStudent />
                </SchoolProtectedRoute>
              }
            />
            
            <Route
  path="/student/list"
  element={
    <SchoolProtectedRoute>
      <StudentList />
    </SchoolProtectedRoute>
  }
/>

            {/* Owner Panel */}
            <Route
              path="/owner/dashboard"
              element={
                <OwnerProtectedRoute>
                  <OwnerDashboard />
                </OwnerProtectedRoute>
              }
            />
            <Route
              path="/owner/create-school"
              element={
                <OwnerProtectedRoute>
                  <CreateSchool />
                </OwnerProtectedRoute>
              }
            />
            <Route
              path="/owner/list-schools"
              element={
                <OwnerProtectedRoute>
                  <ListSchools />
                </OwnerProtectedRoute>
              }
            />
            <Route
              path="/owner/edit-school/:id"
              element={
                <OwnerProtectedRoute>
                  <EditSchool />
                </OwnerProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SchoolAuthProvider>
    </OwnerAuthProvider>
  );
}

export default App;
