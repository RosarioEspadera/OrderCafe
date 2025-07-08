document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");

  if (!signInBtn || !mainContent) {
    console.warn("Essential UI elements missing. Animation skipped.");
    return;
  }

  signInBtn.addEventListener("click", () => {
    // Hide the Sign In button
    signInBtn.style.display = "none";

    // Reveal the main content with animation
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  });
});
