window.addEventListener("DOMContentLoaded", () => {
  const savedUser = localStorage.getItem("orderCafeUser");
  if (savedUser) {
    openModal("mainModal");
    showToast(`Welcome back, ${savedUser}!`);
  } else {
    openModal("signInModal");
  }
});

document.getElementById("signInBtn")?.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showToast("Please fill in both fields.");
    return;
  }

  const userData = {
    username,
    profilePhoto: "", // default profile photo if needed
    orders: []        // placeholder until Step 3
  };

  localStorage.setItem("orderCafeUser", JSON.stringify(userData));
  closeModal("signInModal");
  openModal("mainModal");
  showToast(`Signed in as ${username}`);
});

