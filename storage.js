// // storage.js

// const STORAGE_KEY = 'students';

// // Get students from localStorage
// export function getStudents() {
//   const data = localStorage.getItem(STORAGE_KEY);
//   return data ? JSON.parse(data) : [];
// }

// // Save a new student
// export function saveStudent(student) {
//   const students = getStudents();
//   students.push(student);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
// }

// // Remove a student by roll number
// export function deleteStudent(roll) {
//   const students = getStudents().filter(s => s.roll !== roll);
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
// }
// // Dark mode toggle
// window.toggleDarkMode = function () {
//   const body = document.body;
//   const modeToggle = document.getElementById('modeToggle');

//   const isDark = body.classList.toggle('dark-mode');
//   localStorage.setItem('theme', isDark ? 'dark' : 'light');

//   // Update button label correctly
//   modeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
// };

// // Load saved theme on page load
// document.addEventListener('DOMContentLoaded', () => {
//   const savedTheme = localStorage.getItem('theme');
//   const modeToggle = document.getElementById('modeToggle');

//   if (savedTheme === 'dark') {
//     document.body.classList.add('dark-mode');
//     if (modeToggle) modeToggle.textContent = '☀️ Light Mode';
//   } else {
//     if (modeToggle) modeToggle.textContent = '🌙 Dark Mode';
//   }
// });

// storage.js — using Linked List internally

const STORAGE_KEY = "students";

// Linked List Node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Linked List
class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = newNode;
    }
  }

  delete(roll) {
    if (!this.head) return;

    if (this.head.data.roll === roll) {
      this.head = this.head.next;
      return;
    }

    let curr = this.head;
    while (curr.next && curr.next.data.roll !== roll) {
      curr = curr.next;
    }

    if (curr.next) {
      curr.next = curr.next.next;
    }
  }

  toArray() {
    let result = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.data);
      curr = curr.next;
    }
    return result;
  }

  fromArray(arr) {
    this.head = null;
    arr.forEach(data => this.insert(data));
  }
}

const studentList = new LinkedList();

// Load data from localStorage
function loadFromLocalStorage() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  studentList.fromArray(saved);
}
loadFromLocalStorage();

export function getStudents() {
  return studentList.toArray();
}

export function saveStudent(student) {
  studentList.insert(student);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studentList.toArray()));
}

export function deleteStudent(roll) {
  studentList.delete(roll);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studentList.toArray()));
}
