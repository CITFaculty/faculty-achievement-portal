const auth = firebase.auth();
const db = firebase.firestore();

// ✅ Show Login Card
function showLogin() {
  document.getElementById("registerCard").style.display = "none";
  document.getElementById("loginCard").style.display = "block";
}

// ✅ Show Register Card
function showRegister() {
  document.getElementById("loginCard").style.display = "none";
  document.getElementById("registerCard").style.display = "block";
}

// ✅ Login
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorEl = document.getElementById("error");

  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if (cred.user.emailVerified) {
        window.location.href = "faculty.html";
      } else {
        showToast("Please verify your email before logging in.");
        auth.signOut();
      }
    })
    .catch(error => {
      errorEl.textContent = "Login failed: " + error.message;
    });
}

// ✅ Register with Email Verification
function register() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const errorEl = document.getElementById("errorRegister");

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
      }).then(() => cred.user.sendEmailVerification());
    })
    .then(() => {
      showToast("Verification email sent! Please check your inbox.");
      showLogin();
    })
    .catch(error => {
      errorEl.textContent = "Registration failed: " + error.message;
    });
}

// ✅ Forgot Password
function forgotPassword() {
  const email = document.getElementById("loginEmail").value.trim();
  if (!email) {
    showToast("Enter your email first");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      showToast("Reset link sent to your email!");
    })
    .catch((error) => {
      showToast("Error: " + error.message);
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
