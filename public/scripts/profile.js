document.addEventListener("DOMContentLoaded", () => {
  console.log("🎯 Simple Profile Flow Activated");

  // Element references
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentProfilePhoto = document.getElementById("currentProfilePhoto");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");
  const guestBanner = document.getElementById("guestBanner");
  const profileBtn = document.getElementById("profileBtn"); // For opening overlay
  const closeProfile = document.getElementById("closeProfile");
  const fallback = "images/bg.png";

  // Load stored user
  const rawUser = localStorage.getItem("orderCafeUser");
  let user = null;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.warn("Could not parse user:", err);
  }

  // Show UI if user exists
  if (user) {
    updateUI(user);
  } else {
    guestBanner?.classList.remove("hidden");
  }

  function updateUI(userData) {
    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");
    profileOverlay.style.display = "block";

    profileName.textContent = userData.username || "Guest";
    currentProfilePhoto.src = userData.profilePhoto || fallback;

    guestBanner?.classList.add("hidden");
  }

  // Activate overlay manually
  profileBtn?.addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
    updateUI(userData);
  });

  closeProfile?.addEventListener("click", () => {
    profileOverlay.classList.add("hidden");
    profileOverlay.classList.remove("visible");
    profileOverlay.style.display = "none";
  });

  // Upload new profile photo
  profilePhotoUpload?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      const storedUser = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
      storedUser.profilePhoto = base64;
      localStorage.setItem("orderCafeUser", JSON.stringify(storedUser));
      currentProfilePhoto.src = base64;
    };
    reader.readAsDataURL(file);
  });

  // Full-size preview
  currentProfilePhoto?.addEventListener("click", () => {
    const src = currentProfilePhoto.src;
    if (!src || src === fallback || src === location.href) return;
    fullSizePhoto.src = src;
    photoPreviewOverlay.classList.remove("hidden");
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay.classList.add("hidden");
  });

  // Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay.classList.add("hidden");
    profileOverlay.style.display = "none";
    guestBanner?.classList.remove("hidden");
    profileName.textContent = "Guest";
    currentProfilePhoto.src = fallback;
  });
});
