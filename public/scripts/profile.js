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
function generateOrderGallery() {
  const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
  const orders = userData?.orders || [];

  if (!orders.length) return "<p>No recent orders found ☕</p>";

  return orders.map(order => `
    <div class="gallery-item">
      <img src="${order.image}" alt="${order.name}" />
      <p>${order.name} - $${order.price}</p>
    </div>
  `).join("");
}

document.addEventListener("click", (e) => {
  const clickedProfileBtn = e.target.closest("#profileBtn");
  if (clickedProfileBtn) {
    console.log("✅ Profile button activated:", clickedProfileBtn);

    const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
    profileName.textContent = userData?.username || "Guest";
    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");

    loadProfilePhoto();

    const orderImages = document.getElementById("orderImages");
    if (!orderImages) {
      console.warn("⚠️ orderImages is not visible or missing.");
    } else {
      try {
        orderImages.innerHTML = generateOrderGallery();
      } catch (error) {
        console.error("🚨 Failed to generate gallery:", error);
        orderImages.innerHTML = "<p>Unable to load your orders at the moment.</p>";
      }
    }
  }
});


closeProfile.addEventListener("click", () => {
  profileOverlay.classList.remove("visible");
  profileOverlay.classList.add("hidden");
});

});
  
