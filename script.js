const auth = firebase.auth();
const db = firebase.firestore();

// LOGIN
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "faculty.html";
    })
    .catch(error => {
      errorEl.textContent = "Login failed: " + error.message;
    });
}

// REGISTER
function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!name || !email || !password) {
    errorEl.textContent = "Please fill in all fields to register.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db.collection("facultyUsers").doc(cred.user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("Registered successfully! You can now log in.");
    })
    .catch(error => {
      errorEl.textContent = "Registration failed: " + error.message;
    });
}
// ✅ Show toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// ✅ Forgot Password
function forgotPassword() {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showToast("Enter your email first");
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      showToast("Reset link sent to your email!");
    })
    .catch((error) => {
      showToast("Error: " + error.message);
    });
}

// ✅ Register with Email Verification
function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (!name || !email || !password) {
    errorEl.textContent = "Please fill in all fields to register.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // Save name in Firestore
      return db.collection("facultyUsers").doc(cred.user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => cred.user.sendEmailVerification());
    })
    .then(() => {
      showToast("Verification email sent! Please check your inbox.");
    })
    .catch(error => {
      errorEl.textContent = "Registration failed: " + error.message;
    });
}
