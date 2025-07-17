// addStudent.js

import { saveStudent } from './storage.js';

document.getElementById('studentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  const email = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value.trim();

  if (name && roll && email && course) {
    const student = { name, roll, email, course };
    saveStudent(student);
    alert('Student added successfully!');
    e.target.reset();
  } else {
    alert('Please fill all fields!');
  }
});
// Dark mode toggle
window.toggleDarkMode = function () {
  const body = document.body;
  const modeToggle = document.getElementById('modeToggle');

  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Update button label correctly
  modeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
};

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const modeToggle = document.getElementById('modeToggle');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (modeToggle) modeToggle.textContent = '☀️ Light Mode';
  } else {
    if (modeToggle) modeToggle.textContent = '🌙 Dark Mode';
  }
});
