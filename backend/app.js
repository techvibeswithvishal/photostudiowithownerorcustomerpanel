require('dotenv').config();  // Load .env
const express = require('express');
const cors = require('cors');        // ✅ CORS middleware
const connectDB = require('./config/db');

// Import routes
const ownerRoutes = require('./routes/ownerRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// ✅ CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // frontend URL from .env
  credentials: true
}));

// Routes
app.use('/api/owner', ownerRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/student', studentRoutes);

// ✅ Simple “backend is live” route
app.get('/', (req, res) => {
  res.send('🎉 Backend is running and you are live! 🚀');
});
app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: "Ping received. Backend awake!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
