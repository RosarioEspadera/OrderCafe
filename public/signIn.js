document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signInBtn");
  const signInModal = document.getElementById("signInModal");
  const closeBtn = document.getElementById("closeBtn");

  if (!signInBtn || !signInModal || !closeBtn) {
    console.warn("Missing one or more sign-in modal elements. Skipping setup.");
    return;
  }

  // Show modal when Sign In button is clicked
  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
  });

  // Close modal when Cancel button is clicked
  closeBtn.addEventListener("click", () => {
    signInModal.close();
  });
});
