require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/log.js');
const upload = require('./middleware/multer.js');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express(); 

app.use(cors()); 

// Middleware
app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));

// Routes
app.use('/users', userRoutes);
app.use('/skills', require('./routes/skills.js'));

// Upload endpoint  

app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: 'Upload berhasil',
  });           
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});