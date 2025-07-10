document.addEventListener("DOMContentLoaded", () => {
  // 💡 Essential elements only
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signUpToggleBtn = document.getElementById("signUpToggleBtn");
  const guestAccessBtn = document.getElementById("guestAccessBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const signUpModal = document.getElementById("signUpModal");

  // 🎯 Entrance animation for toggle
  signUpToggleBtn.addEventListener("click", () => {
  signInModal.close();
  signUpModal.showModal();


  requestAnimationFrame(() => {
    signUpModal.classList.add("visible");
    document.getElementById("newUsername").focus();
  });
});


  // ✨ Smooth transition helper
  function hideModalWithTransition(modal) {
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => modal.close(), { once: true });
  }

  // ☕ Reveal café interface
 function revealMainContent() {
  hideModalWithTransition(signInModal);
  document.getElementById("signInBtn").style.display = "none";
  const mainContent = document.getElementById("mainContent");
  mainContent.classList.remove("hidden");
  mainContent.classList.add("visible");
}

    hideModalWithTransition(signInModal);
    document.getElementById("signInBtn").style.display = "none";
    const mainContent = document.getElementById("mainContent");
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  }

  // 🚀 Lightweight auto-login with delay
  setTimeout(() => {
    const savedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (savedUser?.username) {
      document.getElementById("userNameDisplay").textContent = savedUser.username;
      const banner = document.getElementById("welcomeBanner");
      banner.classList.remove("hidden");
      banner.classList.add("visible");
      revealMainContent(); // no audio/animations
    }
  }, 100);

  // 🔓 Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("orderCafeUser");
      location.reload();
    });
  }

  // 👤 Sign-in submit
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const audio = document.getElementById("signInAudio");
    if (audio) audio.play();

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

    try {
      const response = await fetch("https://ordercafe-rio-hxxc.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("orderCafeUser", JSON.stringify({ username }));
        document.getElementById("userNameDisplay").textContent = username;
        document.getElementById("welcomeBanner").classList.remove("hidden");
        revealMainContent(true); // includes animation/audio
      } else {
        alert(result.error || "Login failed.");
        signInModal.classList.add("shake");
        signInModal.addEventListener("animationend", () => {
          signInModal.classList.remove("shake");
        }, { once: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  });

  // 🧑‍🎨 Guest access
  if (guestAccessBtn) {
    guestAccessBtn.addEventListener("click", () => {
      const toast = document.createElement("div");
      toast.textContent = "Welcome, Guest ☕";
      toast.className = "guest-toast";
      const mainContent = document.getElementById("mainContent");
      mainContent.appendChild(toast);
      setTimeout(() => toast.classList.add("fade-out"), 2500);
      setTimeout(() => toast.remove(), 3500);
      revealMainContent(true);
    });
  }

  // 💫 Escape closes modal
  signInModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModalWithTransition(signInModal);
    }
  });

  // 📦 Always show modal last
  signInModal.showModal();
  requestAnimationFrame(() => {
    signInModal.classList.add("visible");
  });
});

