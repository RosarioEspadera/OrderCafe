document.addEventListener("DOMContentLoaded", () => {
  // 🌟 DOM references
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signUpModal = document.getElementById("signUpModal");
  const signUpToggleBtn = document.getElementById("signUpToggleBtn");
  const signUpBtn = document.getElementById("signUpBtn");
  const signUpCloseBtn = document.getElementById("signUpCloseBtn");
  const guestAccessBtn = document.getElementById("guestAccessBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const welcomeBanner = document.getElementById("welcomeBanner");
  const loader = document.getElementById("loader");

  // ✨ Utility: modal transition
  function hideModalWithTransition(modal) {
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => modal.close(), { once: true });
  }

  // ✨ Utility: toast
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), 2500);
    setTimeout(() => toast.remove(), 3500);
  }

  // ✨ Utility: loader toggle
  function toggleLoader(show) {
    loader?.classList.toggle("hidden", !show);
  }

  // 🔓 Reveal main content (after login or guest access)
  function revealMainContent(withEffects = false) {
    hideModalWithTransition(signInModal);
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
    if (withEffects) {
      document.getElementById("signInAudio")?.play();
    }
  }

  // 🎯 Toggle to Sign-Up modal
  signUpToggleBtn?.addEventListener("click", () => {
    signInModal.close();
    signUpModal.showModal();
    requestAnimationFrame(() => {
      signUpModal.classList.add("visible");
      document.getElementById("newUsername").focus();
    });
  });

  // 📝 Sign-Up logic
  signUpBtn?.addEventListener("click", async (e) => {
    e.preventDefault();

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!newUsername || !newPassword) {
      alert("Please enter both username and password.");
      signUpModal.classList.add("shake");
      signUpModal.addEventListener("animationend", () => {
        signUpModal.classList.remove("shake");
      }, { once: true });
      return;
    }

    toggleLoader(true);
try {
  const response = await fetch("https://ordercafe-rio-hxxc.onrender.com/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: newUsername, password: newPassword }),
  });

  if (response.ok) {
    showToast("Account created — please sign in ☕");
    hideModalWithTransition(signUpModal);
    signInModal.showModal();
    requestAnimationFrame(() => {
      signInModal.classList.add("visible");
      document.getElementById("username").focus();
    });
  } else {
    const result = await response.json();
    showToast(result.error || "Signup failed. Try a different username.");
    signUpModal.classList.add("shake");
    signUpModal.addEventListener("animationend", () => {
      signUpModal.classList.remove("shake");
    }, { once: true });
  }
} catch (err) {
  console.error("Signup error:", err);
  showToast("Network error. Please try again.");
} finally {
  toggleLoader(false);
}
  });

  // ❌ Close Sign-Up modal
  signUpCloseBtn?.addEventListener("click", () => {
    hideModalWithTransition(signUpModal);
    signInModal.showModal();
    requestAnimationFrame(() => {
      signInModal.classList.add("visible");
    });
  });

  // 🚪 Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    location.reload();
  });

  // 👤 Sign-In submit
  signInForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      signInModal.classList.add("shake");
      signInModal.addEventListener("animationend", () => {
        signInModal.classList.remove("shake");
      }, { once: true });
      return;
    }

    toggleLoader(true);
    try {
      const response = await fetch("https://ordercafe-rio-hxxc.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("orderCafeUser", JSON.stringify({ username, password }));
        document.getElementById("userNameDisplay").textContent = username;
        welcomeBanner.classList.remove("hidden");
        welcomeBanner.classList.add("visible");
        showToast("Signed in successfully ☕");
        revealMainContent(true);
      } else {
        showToast(result.error || "Login failed.");
        signInModal.classList.add("shake");
        signInModal.addEventListener("animationend", () => {
          signInModal.classList.remove("shake");
        }, { once: true });
      }
    } catch (err) {
      showToast("Network error. Please try again.");
    } finally {
      toggleLoader(false);
    }
  });

  // 🧑‍🎨 Guest Access
  guestAccessBtn?.addEventListener("click", () => {
    showToast("Welcome, Guest ☕");
    revealMainContent(true);
  });

  // 💫 Escape closes modal
  signInModal?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModalWithTransition(signInModal);
    }
  });

  // 🚀 Auto-login or fallback auto-signup
  setTimeout(async () => {
    const savedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (savedUser?.username && savedUser?.password) {
      toggleLoader(true);
      try {
        const response = await fetch("https://ordercafe-rio-hxxc.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedUser),
        });

        if (response.ok) {
          document.getElementById("userNameDisplay").textContent = savedUser.username;
          welcomeBanner.classList.remove("hidden");
          welcomeBanner.classList.add("visible");
          showToast("Welcome back, " + savedUser.username + " ☕");
          revealMainContent();
        } else {
          // ✨ Auto-signup fallback
          await fetch("https://ordercafe-rio-hxxc.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedUser),
          });

          document.getElementById("userNameDisplay").textContent = savedUser.username;
          welcomeBanner.classList.remove("hidden");
          welcomeBanner.classList.add("visible");
          showToast("New account created on your return ☕");
          revealMainContent();
        }
      } catch (err) {
        showToast("Auto login/sign-up failed.");
      } finally {
        toggleLoader(false);
      }
    }
  }, 100);

  // 📦 Show Sign-In modal initially
  signInModal?.showModal();
  requestAnimationFrame(() => {
    signInModal.classList.add("visible");
  });
});
