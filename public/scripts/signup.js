// 🌐 Imports
import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';

// 🔗 Backend Endpoint
const BACKEND_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://ordercafe-rio-hxxc.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Element References
  const signUpForm = document.getElementById("signUpForm");
  const usernameInput = document.getElementById("newUsername");
  const passwordInput = document.getElementById("newPassword");
  const warning = document.getElementById("usernameTakenWarning");
  const signUpBtn = document.getElementById("signUpBtn");
  const cancelBtn = document.getElementById("signUpCloseBtn");

  // 🔎 Hide warning when typing
  usernameInput?.addEventListener("input", () => {
    warning?.classList.add("hidden");
  });

  // 🔐 Handle Sign-Up Submission
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
        // Do NOT store user yet to avoid auto-login or profile modal popping
        showToast("Account created! Please sign in ☕");

        // Hide sign-up modal, show sign-in modal
        closeModal("signUpModal");
        openModal("signInModal");

        // Focus the username field for smooth login
        document.getElementById("username")?.focus();
      } else if (res.status === 409) {
        warning?.classList.remove("hidden");
        showToast("Username already taken 🍩");
      } else {
        showToast(data.error || "Sign-up failed ❌");
      }
    } catch (error) {
      console.error("Signup error:", error);
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

