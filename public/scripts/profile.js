document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile script loaded ✅");

  const profileBtn = document.getElementById("profileBtn");
  const profileOverlay = document.getElementById("profileOverlay");
  const closeProfile = document.getElementById("closeProfile");
  const profileName = document.getElementById("profileName");

  if (!profileBtn || !profileOverlay) {
    console.log("Missing elements:", { profileBtn, profileOverlay });
    return;
  }

  profileBtn.addEventListener("click", () => {
    console.log("Profile button clicked!");

    const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
    profileName.textContent = userData?.username || "Guest";

    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");
  });

  closeProfile.addEventListener("click", () => {
    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");
  });
});

  
  
