document.getElementById("newUsername")?.addEventListener("input", async (e) => {
  const username = e.target.value.trim();
  if (!username || username.length < 3) {
    document.getElementById("usernameTakenWarning")?.classList.add("hidden");
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/user/${username}`);
    const taken = res.ok;
    document.getElementById("usernameTakenWarning")?.classList[taken ? "remove" : "add"]("hidden");
  } catch (err) {
    console.error("Username check error:", err);
  }
});

document.getElementById("signUpBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  if (!username || !password) return showToast("Fill out all fields!");
  if (password.length < 6) {
    showToast("Password must be at least 6 characters 🔐");
    return;
  }

  const warningVisible = !document.getElementById("usernameTakenWarning")?.classList.contains("hidden");
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
      closeModal("signUpModal");
      openModal("mainModal");
      showToast("Account created ☕");
    } else {
      showToast(data.error || "Signup failed");
    }
  } catch (err) {
    showToast("Server error ☁️");
    console.error(err);
  }
});

    
