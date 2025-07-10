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
  const signUpModal = document.getElementById("signUpModal");
  const signUpForm = document.getElementById("signUpForm");
  const signUpBtn = document.getElementById("signUpBtn");
  const signUpToggleBtn = document.getElementById("signUpToggleBtn");
  const signUpCloseBtn = document.getElementById("signUpCloseBtn");


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
const savedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
if (savedUser?.username) {
  const userDisplay = document.getElementById("userNameDisplay");
  userDisplay.textContent = savedUser.username;
  const banner = document.getElementById("welcomeBanner");
  banner.classList.remove("hidden");
  banner.classList.add("visible");
  revealMainContent();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("orderCafeUser");
      location.reload();
    });
  }

  return;
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

  const userDisplay = document.getElementById("userNameDisplay");
  if (userDisplay) {
    userDisplay.textContent = username;
    document.getElementById("welcomeBanner").classList.remove("hidden");
  }

  revealMainContent(); // 🎉 Show the café interface
}
 else {
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
signUpToggleBtn.addEventListener("click", () => {
  signInModal.close();
  signUpModal.showModal();
  const signupTitle = document.querySelector("#signUpModal h2");
signupTitle.style.animation = "none"; // Reset
void signupTitle.offsetWidth;         // Force reflow
signupTitle.style.animation = "fadeSlideIn 0.8s ease-out forwards";

  requestAnimationFrame(() => {
    signUpModal.classList.add("visible");
    document.getElementById("newUsername").focus();
  });
});


signUpCloseBtn.addEventListener("click", () => {
  signUpModal.classList.remove("visible");
  signUpModal.addEventListener("transitionend", () => signUpModal.close(), { once: true });
});

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newUsername = document.getElementById("newUsername").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();

  if (!newUsername || !newPassword) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const res = await fetch("https://ordercafe-rio-hxxc.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newPassword }),
    });

    const result = await res.json();
    const toast = document.createElement("div");
    toast.textContent = "Welcome to the café, " + newUsername + "!";
    toast.className = "guest-toast";
    mainContent.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), 2500);
    setTimeout(() => toast.remove(), 3500);


    if (res.ok) {
      alert("Account created successfully. Please sign in.");
      signUpModal.close();
      signInModal.showModal();
    } else {
      alert(result.error || "Registration failed.");
    }
  } catch (err) {
    console.error("Registration error:", err);
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


