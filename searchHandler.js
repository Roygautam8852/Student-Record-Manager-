import { getStudents } from './storage.js';

window.searchStudent = function () {
  const roll = document.getElementById("searchRoll").value.trim();
  const resultDiv = document.getElementById("searchResult");
  const students = getStudents();

  if (!roll) {
    resultDiv.textContent = "⚠️ Please enter a roll number.";
    resultDiv.style.color = "orange";
    return;
  }

  const student = students.find(s => s.roll === roll);

  if (student) {
    resultDiv.innerHTML = `
      ✅ <strong>${student.name}</strong> (${student.roll})<br>
      📧 ${student.email}<br>
      📘 ${student.course}
    `;
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = `❌ No student found with Roll No: ${roll}`;
    resultDiv.style.color = "red";
  }
};
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
