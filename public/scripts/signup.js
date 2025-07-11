document.getElementById("signUpBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  if (!username || !password) return showToast("Fill out all fields!");

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
