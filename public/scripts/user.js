import { showToast } from './toast.js';

export function initUserCredentials() {
  const userModal = document.getElementById("userModal");
  const userForm = document.getElementById("userForm");
  const userFeedback = document.getElementById("userFeedback");

  const storedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
  if (!storedUser) userModal?.showModal();

  userForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !email.includes("@")) {
      showToast("Please enter a valid name and email 📭");
      return;
    }

    localStorage.setItem("orderCafeUser", JSON.stringify({ username, email }));
    userFeedback?.classList.remove("hidden");
    showToast("User credentials saved 📝");
    setTimeout(() => userModal?.close(), 1500);
  });
}
