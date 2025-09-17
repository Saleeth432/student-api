const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the student routes at /api/students
app.use('/api/students', studentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Student Management API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
