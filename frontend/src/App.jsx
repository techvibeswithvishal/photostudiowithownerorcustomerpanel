// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

// Public Pages
import Home from "./pages/Home";

// Student Panel
import StudentPanel from "./pages/student/StudentPanel"; // New combined panel

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
  return (
    <OwnerAuthProvider>
      <SchoolAuthProvider>
        <Router>
          <Routes>
            {/* Public/Homepage Layout */}
            <Route path="/" element={<Home />} />

            {/* Combined Student Panel */}
            <Route
              path="/student/dashboard"
              element={
                <SchoolProtectedRoute>
                  <StudentPanel />
                </SchoolProtectedRoute>
              }
            />

            {/* Owner Panel Routes */}
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
