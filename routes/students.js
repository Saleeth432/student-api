const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to your data file
const dataFilePath = path.join(__dirname, '../data/students.json');

// Helper to read students from file
function readStudents() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // If file missing or corrupted, return empty array
    return [];
  }
}

// Helper to save students to file
function saveStudents(students) {
  fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2));
}

// GET all students
router.get('/', (req, res) => {
  const students = readStudents();
  res.json(students);
});

// POST add new student
router.post('/', (req, res) => {
  const { name, age, course, year, status } = req.body;

  // Validation
  if (!name || !course || !year) {
    return res.status(400).json({ error: 'Name, course, and year are required' });
  }

  if (!age || typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ error: 'Age must be a number greater than 0' });
  }

  // Create new student object
  const newStudent = {
    id: Date.now(), // unique ID
    name,
    age,
    course,
    year,
    status: status || 'active' // default status
  };

  const students = readStudents();
  students.push(newStudent);
  saveStudents(students);

  res.status(201).json(newStudent);
});

module.exports = router;
