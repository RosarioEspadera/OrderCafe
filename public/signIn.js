// Inside app.js
// Element references
const signInModal = document.getElementById("signInModal");
const openBtn = document.getElementById("signInBtn");
const closeBtn = document.getElementById("closeSignIn");
const loginMessage = document.getElementById("loginMessage");

// 🚪 Auto-show modal on page load if not logged in
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    signInModal.showModal();
    document.body.classList.add("modal-open");
    document.getElementById("mainContent").style.display = "none";
  } else {
    document.getElementById("mainContent").style.display = "block";
  }
});



openBtn.addEventListener("click", () => {
  signInModal.showModal();
  document.body.classList.add("modal-open");
});

signInModal.addEventListener("click", (e) => {
  const rect = signInModal.getBoundingClientRect();
  const clickedInside = (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
  if (!clickedInside) {
    signInModal.close();
    document.body.classList.remove("modal-open");
  }
});
document.getElementById("signInForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page refresh

  const emailInput = document.getElementById("signInEmail").value.trim();
  const passwordInput = document.getElementById("signInPassword").value.trim();

  // Sample dummy credentials (customize or replace later with real auth)
  const validEmail = "admin@ordercafe.com";
  const validPassword = "coffee123";

  if (emailInput === validEmail && passwordInput === validPassword) {
  localStorage.setItem("isLoggedIn", "true");
  loginMessage.textContent = "Welcome back, admin!";
  loginMessage.style.color = "#4B3F2F"; // your brand color
    
    document.getElementById("mainContent").style.display = "block";
    // Optional: Close modal after login
    setTimeout(() => {
      document.getElementById("signInModal").close();
      loginMessage.textContent = "";
    }, 1500);
  } else {
    loginMessage.textContent = "Invalid credentials. Try again ☕";
    loginMessage.style.color = "#C0392B"; // error red
  }
});
closeBtn.addEventListener("click", () => {
  signInModal.close();
  document.body.classList.remove("modal-open");
  document.getElementById("signInForm").reset();
  document.getElementById("loginMessage").textContent = "";
});


