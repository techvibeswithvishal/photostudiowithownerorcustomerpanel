import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SchoolLogin from "./components/SchoolLogin.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Contact from "./components/Contact.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";

// Context
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { user } = useAuth(); // Logged-in school user

  return (
    <Router>
      <Routes>
        {/* Home / Landing page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <SchoolLogin />
              <About />
              <Services />
              <Portfolio />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* School Panel / Dashboard */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard schoolId={user.uid} /> : <SchoolLogin />}
        />
        <Route
          path="/add-student"
          element={user ? <AddStudent schoolId={user.uid} /> : <SchoolLogin />}
        />
        <Route
          path="/edit-student/:id"
          element={user ? <EditStudent /> : <SchoolLogin />}
        />
      </Routes>
    </Router>
  );
}

export default App;
