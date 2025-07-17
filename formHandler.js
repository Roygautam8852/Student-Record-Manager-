// formHandler.js

import { saveStudent } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const student = {
      name: form.name.value.trim(),
      roll: form.roll.value.trim(),
      email: form.email.value.trim(),
      course: form.course.value.trim()
    };

    // Validate input
    if (!student.name || !student.roll || !student.email || !student.course) {
      alert('Please fill in all fields!');
      return;
    }

    // Save student and reset form
    saveStudent(student);
    alert('Student added successfully!');
    form.reset();
  });
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
