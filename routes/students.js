const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '..', 'data', 'students.json');

// Helper function to read students data
function readStudents() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

// Helper function to write students data
function writeStudents(students) {
  fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2));
}

// GET /api/students - Get all students
router.get('/', (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read student data.' });
  }
});

// POST /api/students - Add a new student
router.post('/', (req, res) => {
  try {
    const { name, age, course, year, status } = req.body;

    // Validation
    if (!name || !course || !year || !age || typeof age !== 'number' || age <= 0) {
      return res.status(400).json({ error: 'Invalid input. Please provide name, age (positive number), course, and year.' });
    }

    const students = readStudents();

    const newStudent = {
      id: Date.now(),
      name,
      age,
      course,
      year,
      status: status || 'active'
    };

    students.push(newStudent);
    writeStudents(students);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new student.' });
  }
});

module.exports = router;
