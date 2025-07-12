// ✏️ Live Username Validation
document.getElementById("newUsername")?.addEventListener("input", async (e) => {
  const username = e.target.value.trim();
  const warning = document.getElementById("usernameTakenWarning");

  if (!username || username.length < 3) {
    warning?.classList.add("hidden");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/user/${username}`);
    const isTaken = res.ok;
    warning?.classList[isTaken ? "remove" : "add"]("hidden");
  } catch (err) {
    console.error("Username check error:", err);
    warning?.classList.add("hidden"); // Fallback: assume not taken
  }
});

// 🛂 Sign-Up Button Handler
document.getElementById("signUpBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("newUsername")?.value.trim();
  const password = document.getElementById("newPassword")?.value.trim();
  const warning = document.getElementById("usernameTakenWarning");

  if (!username || !password) {
    showToast("Fill out all fields!");
    return;
  }

  if (password.length < 6) {
    showToast("Password must be at least 6 characters 🔐");
    return;
  }

  const warningVisible = !warning?.classList.contains("hidden");
  if (warningVisible) {
    showToast("That username is already taken ☕");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("orderCafeUser", JSON.stringify({
        username,
        profilePhoto: "",
        orders: []
      }));

      // Optional: Hide guest banner, update profile, refresh UI
      document.getElementById("guestBanner")?.classList.add("hidden");
      document.getElementById("mainContent")?.classList.remove("hidden");

      closeModal("signUpModal");
      openModal("mainModal");
      showToast("Account created ☕");
    } else {
      showToast(data.error || "Signup failed ❌");
    }
  } catch (err) {
    console.error("Signup error:", err);
    showToast("Server error ☁️");
  }
});
