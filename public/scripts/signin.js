import { mockUser } from "./mog.js";
import { openModal, closeModal } from "./modal.js";
console.log(mockUser.username); // Just for testing

window.addEventListener("DOMContentLoaded", () => {
 const savedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
if (savedUser) {
  openModal("mainModal");
  showToast(`Welcome back, ${savedUser.username}!`);
} else {
  openModal("signInModal");
}

});

document.getElementById("signInBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) return showToast("Missing username or password");

  try {
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
    } else {
      showToast(data.error || "Signin failed");
    }
  } catch (err) {
    showToast("Server error ☁️");
    console.error(err);
  }
});


