// Initialize Firebase
//import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvGhHeqHpZNX_E_-RT1WGb2tAsTJF1L_U",
  authDomain: "faculty-achievement-portal.firebaseapp.com",
  databaseURL: "https://faculty-achievement-portal-default-rtdb.firebaseio.com",
  projectId: "faculty-achievement-portal",
  storageBucket: "faculty-achievement-portal.firebasestorage.app",
  messagingSenderId: "826501763103",
  appId: "1:826501763103:web:6ba443e497e8059d95452a",
  measurementId: "G-MM18SHHY8T"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form submission
document.getElementById("facultyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const facultyName = document.getElementById("facultyName").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const department = document.getElementById("department").value;
  const roomNumber = document.getElementById("roomNumber").value.trim();

  if (facultyName === "" || subject === "" || roomNumber === "") {
    showNotification("Please fill all fields!", "error");
    return;
  }

  const newFacultyRef = database.ref("faculties").push();
  newFacultyRef.set({
    name: facultyName,
    subject: subject,
    department: department,
    room: roomNumber
  })
  .then(() => {
    showNotification("Faculty details submitted successfully!", "success");
    document.getElementById("facultyForm").reset();
  })
  .catch((error) => {
    showNotification("Error: " + error.message, "error");
  });
});

// Notification display
function showNotification(message, type) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = type;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}
