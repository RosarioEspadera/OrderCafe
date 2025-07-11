document.addEventListener("DOMContentLoaded", () => {
  console.log("Profile script loaded ✅");

  const profileBtn = document.getElementById("profileBtn");
  const profileOverlay = document.getElementById("profileOverlay");
  const closeProfile = document.getElementById("closeProfile");
  const profileName = document.getElementById("profileName");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const currentProfilePhoto = document.getElementById("currentProfilePhoto");
  const logoutFromProfile = document.getElementById("logoutFromProfile");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");

if (logoutFromProfile) {
  logoutFromProfile.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    location.reload();
  });
}
  if (!profileBtn || !profileOverlay) {
  console.log("Missing elements:", { profileBtn, profileOverlay });
  return;
}
currentProfilePhoto?.addEventListener("click", () => {
  const src = currentProfilePhoto.src;
  if (!src) return;
  fullSizePhoto.src = src;
  photoPreviewOverlay.classList.remove("hidden");
});

closePhotoPreview?.addEventListener("click", () => {
  photoPreviewOverlay.classList.add("hidden");
});

  // Handle new profile photo uploads
profilePhotoUpload?.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const userData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
    userData.profilePhoto = reader.result;
    localStorage.setItem("orderCafeUser", JSON.stringify(userData));

    currentProfilePhoto.src = reader.result;
    currentProfilePhoto.classList.remove("hidden");
    currentProfilePhoto.classList.add("visible");
  };
  reader.readAsDataURL(file);
});
    function loadProfilePhoto() {
  const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
  if (userData?.profilePhoto) {
    currentProfilePhoto.src = userData.profilePhoto;
    currentProfilePhoto.classList.remove("hidden");
    currentProfilePhoto.classList.add("visible");
  }
}
function renderUserGallery() {
  const orderImages = document.getElementById("orderImages");
  const userData = JSON.parse(localStorage.getItem("orderCafeUser"));

  if (!orderImages) {
    console.warn("⚠️ orderImages element not found.");
    return;
  }

  orderImages.innerHTML = "";

  userData?.images?.forEach((imgUrl) => {
    const img = document.createElement("img");
    img.src = imgUrl;
    orderImages.appendChild(img);
  });
}

  profileBtn.addEventListener("click", () => {
    console.log("Profile button clicked!");

    const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
    profileName.textContent = userData?.username || "Guest";

    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");
      
    loadProfilePhoto();
    renderUserGallery();
  });

  closeProfile.addEventListener("click", () => {
    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");
  });
});

  
