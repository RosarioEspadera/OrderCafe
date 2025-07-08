window.addEventListener("DOMContentLoaded", () => {
  // Element selectors
  const signInModal = document.getElementById("signInModal");
  const signInBtn = document.getElementById("signInBtn");
  const closeBtn = document.getElementById("closeSignIn");
  const loginMessage = document.getElementById("loginMessage");
  const mainContent = document.getElementById("mainContent");
  const signInForm = document.getElementById("signInForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Safety checks
  if (!signInModal || !signInBtn || !closeBtn || !loginMessage || !mainContent || !signInForm || !usernameInput || !passwordInput) {
    console.error("One or more required elements are missing in the DOM.");
    return;
  }

  // Check login status
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    signInModal.showModal();
    document.body.classList.add("modal-open");
    mainContent.style.display = "none";
    signInBtn.style.display = "block";
  } else {
    mainContent.style.display = "block";
    signInBtn.style.display = "none";
  }

  // Open modal on Sign In button click
  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
    document.body.classList.add("modal-open");
  });

  // Close modal when clicking outside form
  signInModal.addEventListener("click", (e) => {
    if (e.target === signInModal) {
      signInModal.close();
      document.body.classList.remove("modal-open");
    }
  });

  // Handle sign-in form submission
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Update credentials here if needed
    const validUsername = "admin@ordercafe.com";
    const validPassword = "coffee123";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem("isLoggedIn", "true");
      loginMessage.textContent = "Welcome back, admin!";
      loginMessage.style.color = "#4B3F2F";
      mainContent.style.display = "block";
      signInBtn.style.display = "none";

      setTimeout(() => {
        signInModal.close();
        document.body.classList.remove("modal-open");
        loginMessage.textContent = "";
        signInForm.reset();
      }, 1500);
    } else {
      loginMessage.textContent = "Invalid credentials. Try again ☕";
      loginMessage.style.color = "#C0392B";
    }
  });

  // Close modal on close button click
  closeBtn.addEventListener("click", () => {
    signInModal.close();
    document.body.classList.remove("modal-open");
    signInForm.reset();
    loginMessage.textContent = "";
  });
});
