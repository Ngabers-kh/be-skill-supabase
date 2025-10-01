require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/users.js');
const skillRoutes = require('./routes/skills.js');
const boardLeraningRoutes = require('./routes/boardsLearning.js');
const boardFreeLanceRoutes = require('./routes/boardsFreeLance.js');
const BoardApplicationsRoutes = require('./routes/boardApplications.js');


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
app.use('/skills', skillRoutes);
app.use('/boardsLearning', boardLeraningRoutes);
app.use('/boardsFreeLance', boardFreeLanceRoutes);
app.use('/applications', BoardApplicationsRoutes);

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