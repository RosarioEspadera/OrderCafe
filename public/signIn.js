document.addEventListener("DOMContentLoaded", () => {
  // Get main interface and modal elements
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const closeBtn = document.getElementById("closeBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const guestAccessBtn = document.getElementById("guestAccessBtn"); // ❗ Kept outside safety check

  // Modal show animation
  signInModal.showModal();
  requestAnimationFrame(() => {
    signInModal.classList.add("visible");
  });

  // Smooth transition helper
  function hideModalWithTransition(modal) {
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => modal.close(), { once: true });
  }

  // Shared animation function
  function revealMainContent() {
    const puff = document.getElementById("steamPuff");
    const smoke = document.getElementById("smokeTrail");
    const audio = document.getElementById("signInAudio");

    if (puff) {
      puff.classList.add("animate");
      setTimeout(() => puff.classList.remove("animate"), 1200);
    }

    if (smoke) {
      smoke.classList.add("animate");
      setTimeout(() => smoke.classList.remove("animate"), 4000);
    }

    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    hideModalWithTransition(signInModal);
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  }

  // Safety check for sign-in flow only
  if (
    !signInModal || !signInForm || !signInBtn ||
    !mainContent || !closeBtn || !usernameInput || !passwordInput
  ) {
    console.error("Missing essential sign-in elements.");
    return;
  }

  // Close modal
  closeBtn.addEventListener("click", () => {
    hideModalWithTransition(signInModal);
  });

  // Handle form submission
  signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

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
      revealMainContent(); // 🎉 Show the café interface
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

 if (guestAccessBtn) {
    guestAccessBtn.addEventListener("click", () => {
      // Display temporary guest welcome toast
const toast = document.createElement("div");
toast.textContent = "Welcome, Guest ☕";
toast.className = "guest-toast";

mainContent.appendChild(toast);

setTimeout(() => {
  toast.classList.add("fade-out");
}, 2500);

setTimeout(() => {
  toast.remove();
}, 3500);

      revealMainContent();
    });
  }
  // Escape key listener
  signInModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModalWithTransition(signInModal);
    }
  });
});


