import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';

const BACKEND_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://ordercafe-rio-hxxc.onrender.com";

// 🎉 Inject Greeting
function updateGreeting() {
  const banner = document.querySelector("#greetingBanner h2");
  const user = JSON.parse(localStorage.getItem("orderCafeUser"));

  if (banner && user?.username) {
    banner.innerHTML = `Welcome back, <span class="username">${user.username}</span> ☕`;
  }
}

// 🚪 Open Sign-In Modal on Load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signInModal")?.showModal();
});

// 📝 Handle Sign-In
document.getElementById("signInForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const loader = document.getElementById("loader");
  const button = document.getElementById("signInBtn");

  if (!username || !password) {
    showToast("Missing username or password");
    return;
  }

  try {
    button.disabled = true;
    loader?.classList.remove("hidden");

    const res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok && data.user) {
      localStorage.setItem("orderCafeUser", JSON.stringify(data.user));
      updateGreeting();

      closeModal("signInModal");
      showToast(`Welcome back, ${data.user.username} ☕`);

      document.getElementById("mainContent")?.classList.remove("hidden");
      document.getElementById("greetingBanner")?.classList.remove("hidden");
      document.getElementById("guestBanner")?.classList.add("hidden");
    } else {
      showToast(data.error || "Signin failed ❌");
    }
  } catch (err) {
    console.error("Signin error:", err);
    showToast("Server error ☁️");
  } finally {
    button.disabled = false;
    loader?.classList.add("hidden");
  }
});

// 🧁 Toggle to Sign-Up
document.getElementById("signUpToggleBtn")?.addEventListener("click", () => {
  closeModal("signInModal");
  openModal("signUpModal");
  showToast("Let’s get you signed up ☕");
});

// ❌ Cancel Sign-In
document.getElementById("closeBtn")?.addEventListener("click", () => {
  closeModal("signInModal");
  showToast("Sign-in cancelled");
});

// 🔙 Back to Sign-In
document.getElementById("backToSignIn")?.addEventListener("click", () => {
  localStorage.removeItem("orderCafeUser");

  document.getElementById("mainContent")?.classList.add("hidden");
  document.getElementById("greetingBanner")?.classList.add("hidden");
  document.getElementById("guestBanner")?.classList.remove("hidden");

  closeModal("mainModal");
  closeModal("signUpModal");
  openModal("signInModal");

  showToast("Signed out — back to sign in");
});

// 🔄 Switch Account
document.getElementById("switchAccountBtn")?.addEventListener("click", () => {
  if (window.confirm("Sign out and return to sign-in?")) {
    localStorage.removeItem("orderCafeUser");
    closeModal("mainModal");
    openModal("signInModal");
    showToast("Signed out ☕");
  }
});
