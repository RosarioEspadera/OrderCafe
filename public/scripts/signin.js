// 🌅 Check if user is already logged in
window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("orderCafeUser");
  if (savedUser) {
    openModal("mainModal");
    showToast(`Welcome back, ${savedUser}!`);
  } else {
    openModal("signInModal");
  }
});

// 🔐 Sign in when user submits the form
document.getElementById("signInBtn").onclick = () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showToast("Please enter both username and password.");
    return;
  }

  localStorage.setItem("orderCafeUser", username);
  closeModal("signInModal");
  openModal("mainModal");
  showToast(`Signed in as ${username}`);
};

