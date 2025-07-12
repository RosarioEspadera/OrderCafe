document.addEventListener("DOMContentLoaded", () => {
  // 🌟 DOM Elements
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

  const fallbackPhoto = "https://github.com/RosarioEspadera/OrderCafe/blob/main/public/styles/images/bg.png";

  // 🔑 Load User Data
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;
  } catch (err) {
    console.warn("Unable to parse user data:", err);
  }

  // 🧾 Show Profile or Guest
  if (user) {
    displayUserProfile(user);
  } else {
    guestBanner?.classList.remove("hidden");
  }

  // 👤 Display Profile Info
  function displayUserProfile(user) {
    profileName.textContent = user.username || "Guest";
    currentPhoto.src = user.profilePhoto || fallbackPhoto;

    if (!profileOverlay.open) {
      profileOverlay.showModal?.();
    }
    profileOverlay.classList.remove("hidden");
    profileOverlay.style.display = "block";
  }

  // 🖼️ Preview Profile Photo
  currentPhoto?.addEventListener("click", () => {
    const src = currentPhoto.src;
    if (src && src !== fallbackPhoto) {
      fullSizePhoto.src = src;
      photoPreviewOverlay.classList.remove("hidden");
    }
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay.classList.add("hidden");
  });

  // 📷 Handle New Profile Photo Upload
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

  // ❌ Close Profile Modal
  closeProfileBtn?.addEventListener("click", () => {
    profileOverlay.close?.();
    profileOverlay.style.display = "none";
  });

  // 🚪 Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay.close?.();
    profileOverlay.style.display = "none";
    guestBanner?.classList.remove("hidden");

    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;

    document.getElementById("signInModal")?.showModal?.();
  });
});


