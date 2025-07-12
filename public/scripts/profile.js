document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Element References
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentPhoto = document.getElementById("currentProfilePhoto");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");
  const photoUploadInput = document.getElementById("profilePhotoUpload");
  const guestBanner = document.getElementById("guestBanner");
  const closeProfileBtn = document.getElementById("closeProfile");
  const fallbackPhoto = "styles/images/bg.png";

  // 🔍 Load User Info
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("orderCafeUser"));
  } catch (err) {
    console.warn("Failed to load user data:", err);
  }

  // 🧾 Show Profile or Guest Mode
  if (user && user.username) {
    showProfile(user);
  } else {
    guestBanner?.classList.remove("hidden");
    currentPhoto.src = fallbackPhoto;
  }

  // 👤 Display User Details
  function showProfile(user) {
    profileName.textContent = user.username;
    currentPhoto.src = user.profilePhoto || fallbackPhoto;

    if (profileOverlay?.tagName === "DIALOG") {
      profileOverlay.showModal?.();
    } else {
      profileOverlay?.classList.remove("hidden");
      profileOverlay.style.display = "block";
    }
  }

  // 🖼️ View Full Size Profile Photo
  currentPhoto?.addEventListener("click", () => {
    const src = currentPhoto.src;
    if (src && src !== fallbackPhoto) {
      fullSizePhoto.src = src;
      photoPreviewOverlay.classList.remove("hidden");
    }
  });

  // ❌ Close Photo Preview
  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay.classList.add("hidden");
    fullSizePhoto.src = "";
  });

  // 📷 Handle Profile Photo Upload
  photoUploadInput?.addEventListener("change", () => {
    const file = photoUploadInput.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      user.profilePhoto = base64;
      localStorage.setItem("orderCafeUser", JSON.stringify(user));
      currentPhoto.src = base64;
    };
    reader.readAsDataURL(file);
  });

  // 🔙 Close Profile Overlay
  closeProfileBtn?.addEventListener("click", () => {
    if (profileOverlay?.tagName === "DIALOG") {
      profileOverlay.close?.();
    } else {
      profileOverlay?.classList.add("hidden");
      profileOverlay.style.display = "none";
    }
  });

  // 🔓 Logout and Reset View
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");

    if (profileOverlay?.tagName === "DIALOG") {
      profileOverlay.close?.();
    } else {
      profileOverlay?.classList.add("hidden");
      profileOverlay.style.display = "none";
    }

    guestBanner?.classList.remove("hidden");
    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;

    const signInModal = document.getElementById("signInModal");
    if (signInModal?.tagName === "DIALOG") {
      signInModal.showModal?.();
    } else {
      signInModal?.classList.remove("hidden");
      signInModal.style.display = "block";
    }
  });
});
