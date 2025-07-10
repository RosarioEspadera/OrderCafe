document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn"); // Add this button to your header if missing
    const profileOverlay = document.getElementById("profileOverlay");
    const closeProfile = document.getElementById("closeProfile");
    const profileName = document.getElementById("profileName");
  
    // Open profile overlay
    profileBtn?.addEventListener("click", () => {
      profileName.textContent =
        JSON.parse(localStorage.getItem("orderCafeUser"))?.username || "Guest";
      profileOverlay.classList.remove("hidden");
      profileOverlay.classList.add("visible");
    });
  
    // Close profile overlay
    closeProfile?.addEventListener("click", () => {
      profileOverlay.classList.remove("visible");
      profileOverlay.classList.add("hidden");
    });
  });
  
  