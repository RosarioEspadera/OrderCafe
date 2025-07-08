document.addEventListener("DOMContentLoaded", () => {
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const closeBtn = document.getElementById("closeBtn");

  if (!signInBtn || !signInModal || !mainContent || !signInForm || !closeBtn) {
    console.warn("Missing essential sign-in elements.");
    return;
  }

  // Show modal on button click
  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
  });

  // Handle form submit aesthetically
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Block actual submission
    signInModal.close();
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  });

  // Cancel closes modal
  closeBtn.addEventListener("click", () => {
    signInModal.close();
  });
});
