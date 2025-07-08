document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const closeBtn = document.getElementById("closeBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Validate essential elements for functionality
  if (!usernameInput || !passwordInput || !signInBtn) {
    console.error("Missing essential sign-in elements: username, password, or sign-in button.");
    return;
  }

  if (!signInModal || !signInForm || !mainContent || !closeBtn) {
    console.warn("Missing essential UI elements for modal flow.");
    return;
  }

  // Show sign-in modal on button click
  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
  });

  // Handle form submission gracefully
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signInModal.close();
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  });

  // Handle modal close via cancel button
  closeBtn.addEventListener("click", () => {
    signInModal.close();
  });
});
