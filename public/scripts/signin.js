window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signInModal")?.showModal();
  document.getElementById("profileOverlay")?.classList.add("hidden"); // 👈 Add this line here
});

// 🌐 Import utilities
import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';

// 🔗 Backend endpoint
const BACKEND_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://ordercafe-rio-hxxc.onrender.com";

// 🎉 Personalized greeting
function updateGreeting() {
  const banner = document.querySelector("#greetingBanner h2");
  const user = JSON.parse(localStorage.getItem("orderCafeUser"));
  if (banner && user?.username) {
    banner.innerHTML = `Welcome back, <span class="username">${user.username}</span> ☕`;
  }
}

// 🚪 Show Sign-In Modal on Initial Load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signInModal")?.showModal();
});

// 🔐 Sign-In Form Submission
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

    const response = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.user) {
      localStorage.setItem("orderCafeUser", JSON.stringify(data.user));
      updateGreeting();
      closeModal("signInModal");
      showToast(`Welcome back, ${data.user.username} ☕`);

      // 🎯 Show main content and greeting
      document.getElementById("mainContent")?.classList.remove("hidden");
      document.getElementById("greetingBanner")?.classList.remove("hidden");
      document.getElementById("guestBanner")?.classList.add("hidden");

      // 🧹 Clean up modals
      document.getElementById("profileOverlay")?.close();
      document.getElementById("profileOverlay")?.classList.add("hidden");
      document.getElementById("backdrop")?.classList.add("hidden");

      // 🏠 Activate Home tab visually
      const homeTab = document.getElementById("homeTab");
      const tabs = [homeTab, document.getElementById("orderTab"), document.getElementById("profileTab")];
      tabs.forEach(tab => tab?.classList.remove("active"));
      homeTab?.classList.add("active");

      // 🌟 Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showToast(data.error || "Signin failed ❌");
    }
  } catch (error) {
    console.error("Signin error:", error);
    showToast("Server error ☁️");
  } finally {
    button.disabled = false;
    loader?.classList.add("hidden");
  }
});

// 🧁 Open Sign-Up Modal
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

// 🔙 Return to Sign-In from Sign-Up
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

// 🔓 Logout from Profile Modal
document.getElementById("logoutFromProfile")?.addEventListener("click", () => {
  localStorage.removeItem("orderCafeUser");

  document.getElementById("mainContent")?.classList.add("hidden");
  document.getElementById("greetingBanner")?.classList.add("hidden");
  document.getElementById("guestBanner")?.classList.remove("hidden");

  closeModal("profileOverlay");
  closeModal("mainModal");
  openModal("signInModal");
  showToast("Logged out — see you again soon ☕");
});
