document.addEventListener("DOMContentLoaded", () => {
  // 🌟 DOM references
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentProfilePhoto = document.getElementById("currentProfilePhoto");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const guestBanner = document.getElementById("guestBanner");
  const closeProfileBtn = document.getElementById("closeProfile");

  const fallbackPhoto = "https://github.com/RosarioEspadera/OrderCafe/blob/main/public/styles/images/bg.png";

  // 🔑 Load stored user
  let userData = null;
  try {
    const rawUser = localStorage.getItem("orderCafeUser");
    userData = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.warn("Invalid user data in storage", err);
  }

  // 🎯 Show profile or guest view
  if (userData) {
    showProfile(userData);
  } else {
    guestBanner?.classList.remove("hidden");
  }

  // 👤 Profile reveal
  function showProfile(user) {
    profileName.textContent = user.username || "Guest";
    currentProfilePhoto.src = user.profilePhoto || fallbackPhoto;

    if (profileOverlay.open) profileOverlay.close();
    profileOverlay.showModal?.();
    profileOverlay.classList.remove("hidden");
    profileOverlay.style.display = "block";
  }

  // 🖼️ Click to preview profile photo
  currentProfilePhoto?.addEventListener("click", () => {
    const src = currentProfilePhoto.src;
    if (src && src !== fallbackPhoto && src !== window.location.href) {
      fullSizePhoto.src = src;
      photoPreviewOverlay.classList.remove("hidden");
    }
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay.classList.add("hidden");
  });

  // 📷 Upload new profile photo
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

  // ❌ Close profile view
  closeProfileBtn?.addEventListener("click", () => {
    profileOverlay.close?.();
    profileOverlay.style.display = "none";
  });

  // 🚪 Logout from profile
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay.close?.();
    profileOverlay.style.display = "none";
    guestBanner?.classList.remove("hidden");
    profileName.textContent = "Guest";
    currentProfilePhoto.src = fallbackPhoto;

    const signInModal = document.getElementById("signInModal");
    signInModal?.showModal?.();
  });
});

