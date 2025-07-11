document.addEventListener("DOMContentLoaded", () => {
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentProfilePhoto = document.getElementById("currentProfilePhoto");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const guestBanner = document.getElementById("guestBanner");
  const fallback = "images/bg.png";

  // 🌟 Show profile info if user exists
  const rawUser = localStorage.getItem("orderCafeUser");
  let userData = null;

  try {
    userData = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.warn("Could not parse user data:", err);
  }

  if (userData) {
    showProfile(userData);
  } else {
    guestBanner?.classList.remove("hidden");
  }

function showProfile(user) {
  profileName.textContent = user.username || "Guest";
  currentProfilePhoto.src = user.profilePhoto || fallback;

  profileOverlay.classList.remove("hidden");
  profileOverlay.style.display = "block";

  // If it's a dialog
  profileOverlay.showModal?.();
}


  // 🖼️ Photo preview
  currentProfilePhoto?.addEventListener("click", () => {
    const src = currentProfilePhoto.src;
    if (src && src !== fallback && src !== location.href) {
      fullSizePhoto.src = src;
      photoPreviewOverlay.classList.remove("hidden");
    }
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay.classList.add("hidden");
  });

  // 📸 Photo upload
  profilePhotoUpload?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64 = e.target.result;
      userData.profilePhoto = base64;
      localStorage.setItem("orderCafeUser", JSON.stringify(userData));
      currentProfilePhoto.src = base64;
    };
    reader.readAsDataURL(file);
  });

  // 🚪 Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay.close?.();
    profileOverlay.style.display = "none";
    guestBanner?.classList.remove("hidden");
    profileName.textContent = "Guest";
    currentProfilePhoto.src = fallback;

    // ⏱️ Trigger sign-in modal if needed
    const signInModal = document.getElementById("signInModal");
    signInModal?.showModal?.();
  });
});

