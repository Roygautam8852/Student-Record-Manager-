// recordsHandler.js

import { getStudents, deleteStudent } from './storage.js';

function renderStudentList() {
  const listContainer = document.getElementById('studentList');
  listContainer.innerHTML = '';

  const students = getStudents();

  if (students.length === 0) {
    listContainer.innerHTML = '<p>No student records found.</p>';
    return;
  }

  students.forEach(student => {
    const div = document.createElement('div');
    div.className = 'student';

    div.innerHTML = `
      <strong>${student.name}</strong> (Roll: ${student.roll})<br>
      Email: ${student.email} | Course: ${student.course}
      <div>
        <button class="delete-btn" data-roll="${student.roll}">Delete</button>
      </div>
    `;

    listContainer.appendChild(div);
  });

  // Add delete event listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roll = btn.getAttribute('data-roll');
      deleteStudent(roll);
      renderStudentList(); // Re-render after deletion
    });
  });
}

document.addEventListener('DOMContentLoaded', renderStudentList);

// Sort by roll number and re-render
window.sortStudents = function () {
  const students = getStudents();

  students.sort((a, b) => {
    // Convert roll to number for comparison
    return parseInt(a.roll) - parseInt(b.roll);
  });

  const container = document.getElementById('studentList');
  container.innerHTML = '';

  students.forEach((student, index) => {
    const div = document.createElement('div');
    div.className = 'student';

    div.innerHTML = `
      <div>
        <strong>${student.name}</strong> (${student.roll})<br>
        ${student.email}<br>
        <em>${student.course}</em>
      </div>
      <button data-index="${index}">Delete</button>
    `;

    container.appendChild(div);
  });

  // Attach delete handlers again
  document.querySelectorAll('button[data-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      deleteStudent(index);
      sortStudents(); // Keep list sorted after deletion
    });
  });
};
window.exportToCSV = function () {
  const students = getStudents();

  if (students.length === 0) {
    alert("❌ No students to export.");
    return;
  }

  let csvContent = "Roll Number,Name,Email,Course\n";

  students.forEach((student) => {
    csvContent += `${student.roll},${student.name},${student.email},${student.course}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "student_records.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
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
window.searchStudent = function () {
  const roll = document.getElementById('searchRoll').value.trim();
  const resultDiv = document.getElementById('searchResult');
  const students = getStudents();

  if (!roll) {
    resultDiv.textContent = "⚠️ Please enter a roll number.";
    resultDiv.style.color = "orange";
    return;
  }

  const student = students.find(s => s.roll === roll);

  if (student) {
    resultDiv.innerHTML = `
      ✅ <strong>Found:</strong> ${student.name} (${student.roll})<br>
      📧 ${student.email} | 📘 ${student.course}
    `;
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = `❌ No student found with Roll No: ${roll}`;
    resultDiv.style.color = "red";
  }
};
