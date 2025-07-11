document.addEventListener("DOMContentLoaded", () => {
  // 🌟 DOM Elements
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
  const loader = document.getElementById("loader");
  const userDisplay = document.getElementById("userNameDisplay");
  const usernameTakenWarning = document.getElementById("usernameTakenWarning");

  // ✨ Utility: Modal fade-out
  function closeModal(modal) {
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => modal.close(), { once: true });
  }

  // ✨ Utility: Loader toggle
  function toggleLoader(show) {
    loader?.classList.toggle("hidden", !show);
  }

  // ✨ Utility: Toast
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), 2500);
    setTimeout(() => toast.remove(), 3500);
  }

  // ✨ Cleanup overlays and reveal content
  function revealMainContent(playAudio = false) {
    closeModal(signInModal);
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");

    document.querySelectorAll(".overlay, .photoPreviewOverlay, .modal-backdrop")
      .forEach(el => {
        el.classList.add("hidden");
        el.classList.remove("visible");
        el.style.display = "none";
        el.style.pointerEvents = "none";
        el.style.filter = "none";
      });

    if (playAudio) {
      document.getElementById("signInAudio")?.play();
    }
  }

  // 🎯 Toggle to sign-up
  signUpToggleBtn?.addEventListener("click", () => {
    signInModal.close();
    signUpModal.showModal();
    requestAnimationFrame(() => {
      signUpModal.classList.add("visible");
      document.getElementById("newUsername").focus();
    });
  });

  // 📝 Handle sign-up
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
      const res = await fetch('https://ordercafe-rio-hxxc.onrender.com/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });

      if (res.ok) {
        showToast("Account created — please sign in ☕");
        closeModal(signUpModal);
        signInModal.showModal();
        requestAnimationFrame(() => {
          signInModal.classList.add("visible");
          document.getElementById("username").focus();
        });
      } else {
        const result = await res.json();
        usernameTakenWarning.style.display = result.error?.includes("Username") ? "block" : "none";
        showToast(result.error || "Signup failed.");
        signUpModal.classList.add("shake");
        signUpModal.addEventListener("animationend", () => {
          signUpModal.classList.remove("shake");
        }, { once: true });
      }
    } catch (err) {
      console.error("Signup error:", err);
      showToast("Network error. Try again.");
    } finally {
      toggleLoader(false);
    }
  });

  // ❌ Close sign-up
  signUpCloseBtn?.addEventListener("click", () => {
    closeModal(signUpModal);
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

  // 👤 Manual sign-in
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
      const res = await fetch("https://ordercafe-rio-hxxc.onrender.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("orderCafeUser", JSON.stringify({ username, password }));
        userDisplay.textContent = username;
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
      showToast("Network error. Try again.");
    } finally {
      toggleLoader(false);
    }
  });

  // 🎨 Guest Access
  guestAccessBtn?.addEventListener("click", () => {
    showToast("Welcome, Guest ☕");
    revealMainContent(true);
  });

  // 💫 Escape closes modal
  signInModal?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(signInModal);
    }
  });

  // 🚀 Auto-login or fallback signup
  setTimeout(async () => {
    const savedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (savedUser?.username && savedUser?.password) {
      toggleLoader(true);
      try {
        const res = await fetch("https://ordercafe-rio-hxxc.onrender.com/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedUser),
        });

        if (res.ok) {
          userDisplay.textContent = savedUser.username;
          showToast("Welcome back, " + savedUser.username + " ☕");
          revealMainContent();
        } else {
          // fallback to signup
          await fetch("https://ordercafe-rio-hxxc.onrender.com/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedUser),
          });
          userDisplay.textContent = savedUser.username;
          showToast("New account created ☕");
          revealMainContent();
        }
      } catch (err) {
        showToast("Auto login/sign-up failed.");
      } finally {
        toggleLoader(false);
      }
    }
  }, 100);

  // 🧊 Show modal initially
  signInModal?.showModal();
  requestAnimationFrame(() => {
    signInModal.classList.add("visible");
  });
});
