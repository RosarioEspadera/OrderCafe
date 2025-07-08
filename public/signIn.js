// 🌐 Element references
const signInModal = document.getElementById("signInModal");
const signInBtn = document.getElementById("signInBtn");
const closeBtn = document.getElementById("closeSignIn");
const loginMessage = document.getElementById("loginMessage");
const mainContent = document.getElementById("mainContent");

// 🚪 Show modal & hide UI on page load if not logged in
window.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    signInModal.showModal();
    document.body.classList.add("modal-open");
    mainContent.style.display = "none";
  } else {
    mainContent.style.display = "block";
    signInBtn.style.display = "none"; // hide button after login
  }
});

// 📌 Open Sign-In modal manually (optional)
signInBtn.addEventListener("click", () => {
  signInModal.showModal();
  document.body.classList.add("modal-open");
});

// 🖱️ Close modal when clicking outside
signInModal.addEventListener("click", (e) => {
  const rect = signInModal.getBoundingClientRect();
  const clickedInside =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!clickedInside) {
    signInModal.close();
    document.body.classList.remove("modal-open");
  }
});

// 🔐 Handle Sign-In logic
document.getElementById("signInForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("signInEmail").value.trim();
  const passwordInput = document.getElementById("signInPassword").value.trim();

  const validEmail = "admin@ordercafe.com";
  const validPassword = "coffee123";

  if (emailInput === validEmail && passwordInput === validPassword) {
    localStorage.setItem("isLoggedIn", "true");
    loginMessage.textContent = "Welcome back, admin!";
    loginMessage.style.color = "#4B3F2F";

    mainContent.style.display = "block";
    signInBtn.style.display = "none";

    setTimeout(() => {
      signInModal.close();
      loginMessage.textContent = "";
    }, 1500);
  } else {
    loginMessage.textContent = "Invalid credentials. Try again ☕";
    loginMessage.style.color = "#C0392B";
  }
});

// ❌ Manual modal close and form reset
closeBtn.addEventListener("click", () => {
  signInModal.close();
  document.body.classList.remove("modal-open");
  document.getElementById("signInForm").reset();
  loginMessage.textContent = "";
});

closeBtn.addEventListener("click", () => {
  signInModal.close();
  document.body.classList.remove("modal-open");
  document.getElementById("signInForm").reset();
  document.getElementById("loginMessage").textContent = "";
});


