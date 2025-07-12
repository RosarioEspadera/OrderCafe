import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';

const BACKEND_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://ordercafe-rio-hxxc.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signUpForm");
  const usernameInput = document.getElementById("newUsername");
  const passwordInput = document.getElementById("newPassword");
  const warning = document.getElementById("usernameTakenWarning");
  const signUpBtn = document.getElementById("signUpBtn");
  const cancelBtn = document.getElementById("signUpCloseBtn");

  // ✅ Hide warning on input
  usernameInput?.addEventListener("input", () => {
    warning?.classList.add("hidden");
  });

  // 🔐 Handle Sign-Up
  signUpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!username || !password) {
      showToast("Please enter a username and password ☕");
      return;
    }

    try {
      signUpBtn.disabled = true;

      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem("orderCafeUser", JSON.stringify(data.user));
        showToast("Account created! Welcome to Rio’s Café ☕");

        closeModal("signUpModal");
        openModal("signInModal");
        document.getElementById("username")?.focus();
      } else if (res.status === 409) {
        warning?.classList.remove("hidden");
        showToast("Username already taken 🍩");
      } else {
        showToast(data.error || "Sign-up failed ❌");
      }
    } catch (err) {
      console.error("Signup error:", err);
      showToast("Server error ☁️");
    } finally {
      signUpBtn.disabled = false;
    }
  });

  // ❌ Cancel Sign-Up
  cancelBtn?.addEventListener("click", () => {
    closeModal("signUpModal");
    openModal("signInModal");
    showToast("Sign-up cancelled 🍃");
  });
});

