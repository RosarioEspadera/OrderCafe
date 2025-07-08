document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const closeBtn = document.getElementById("closeBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Safety check: Are all key elements present?
  if (!signInModal || !signInForm || !signInBtn || !mainContent || !closeBtn || !usernameInput || !passwordInput) {
    console.error("Missing essential sign-in elements.");
    return;
  }

  // Show modal immediately when the page loads
  signInModal.showModal();

  // Handle form submission
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // You could add more logic here for validation/authentication

    // Close modal and reveal main content
    signInModal.close();
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  });

  // Allow closing the modal with the cancel button
  closeBtn.addEventListener("click", () => {
    signInModal.close();
  });
});

