// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Homepage Layout */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
