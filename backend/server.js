const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leads');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 CRM Backend API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      leads: {
        getAll: 'GET /api/leads',
        getOne: 'GET /api/leads/:id',
        create: 'POST /api/leads',
        update: 'PUT /api/leads/:id',
        delete: 'DELETE /api/leads/:id',
        addNote: 'POST /api/leads/:id/notes'
      }
    },
    status: 'online'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`🚀 Server is running!`);
  console.log('='.repeat(50));
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}`);
  console.log('='.repeat(50) + '\n');
});