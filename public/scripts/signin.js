import { showToast } from './toast.js';
export function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  if (modal.tagName === "DIALOG") {
    if (!modal.open) modal.showModal();
  } else {
    modal.classList.add("visible");
    document.querySelector(".modal-backdrop")?.classList.add("visible");
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  if (modal.tagName === "DIALOG") {
    if (modal.open) modal.close();
  } else {
    modal.classList.remove("visible");
    document.querySelector(".modal-backdrop")?.classList.remove("visible");
  }
}
document.getElementById("signUpToggleBtn")?.addEventListener("click", () => {
  closeModal("signInModal"); // Optional: hide sign-in if it's currently open

  const signUpModal = document.getElementById("signUpModal");
  if (signUpModal?.tagName === "DIALOG") {
    signUpModal.showModal(); // For <dialog> elements
  } else {
    signUpModal?.classList.add("visible"); // If using non-dialog modals
  }

  showToast("Let’s get you signed up ☕");
});


 document.getElementById("signInForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const loader = document.getElementById("loader");

  if (!username || !password) {
    showToast("Missing username or password");
    return;
  }

  try {
    document.getElementById("signInBtn").disabled = true;
    loader?.classList.remove("hidden");

    const res = await fetch(`${BACKEND_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("orderCafeUser", JSON.stringify(data.user));
      closeModal("signInModal");
      openModal("mainModal");
      showToast(`Welcome back, ${username}!`);
     toast.textContent = `☕ Welcome back, ${data.user.name}!`;
    } else {
      showToast(data.error || "Signin failed ❌");
    }
  } catch (err) {
    console.error("Signin error:", err);
    showToast("Server error ☁️");
  } finally {
    document.getElementById("signInBtn").disabled = false;
    loader?.classList.add("hidden");
  }
});

document.getElementById("backToSignIn")?.addEventListener("click", () => {
  // 🗑️ Clear saved user data
  localStorage.removeItem("orderCafeUser");

  // 🔒 Close main modal and sign-up modal if they're open
  closeModal("mainModal");
  closeModal("signUpModal");

  // 🔐 Open the <dialog> modal using showModal()
  const signInModal = document.getElementById("signInModal");
  if (signInModal?.tagName === "DIALOG") {
    signInModal.showModal();
  } else {
    signInModal?.classList.add("visible");
  }

  // ☕ Toast for feedback
  showToast("Signed out — back to sign in");
});


document.getElementById("switchAccountBtn")?.addEventListener("click", () => {
  const confirmed = window.confirm("Sign out and return to sign-in?");
  if (confirmed) {
    localStorage.removeItem("orderCafeUser");
    closeModal("mainModal");
    openModal("signInModal");
    showToast("Signed out ☕");
  }
});






