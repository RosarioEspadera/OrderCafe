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
  const rememberMe = document.getElementById("rememberMe");
  const guestBanner = document.getElementById("guestBanner");
  const isChecked = localStorage.getItem("rememberMeChecked") === "true";
  const user = localStorage.getItem("orderCafeUser");
  const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";
  const rawUser = localStorage.getItem("orderCafeUser");
  const user = rawUser ? JSON.parse(rawUser) : null;
  

  if (rememberMe) rememberMe.checked = isChecked;

if (user && isChecked) {
  profileOverlay.style.display = "block";
  profileOverlay.classList.remove("hidden");
  profileOverlay.classList.add("visible");

  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
    usernameDisplay.textContent = user.username || "Guest";
  }

  const orderImages = document.getElementById("orderImages");
  if (orderImages) {
    try {
      orderImages.innerHTML = generateOrderGallery();
    } catch (error) {
      console.error("📛 Failed to regenerate gallery:", error);
      orderImages.innerHTML = "<p>Unable to load your orders at the moment.</p>";
    }
  }
}

  if (guestBanner && isLoggedOut) {
  guestBanner.classList.remove("hidden");
}
if (logoutFromProfile) {
  logoutFromProfile.addEventListener("click", () => {
    const rememberMe = document.getElementById("rememberMe");
    
    // Save checkbox state
    localStorage.setItem("rememberMeChecked", rememberMe?.checked);

    if (!rememberMe?.checked) {
      localStorage.removeItem("orderCafeUser");
    }
    location.reload();
  });
} // ✅ This brace completes the outer 'if' block

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

document.getElementById("uploadProfilePhoto").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;

      // Store the base64 string to localStorage
      let userData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
      userData.profilePhoto = base64Image;
      localStorage.setItem("orderCafeUser", JSON.stringify(userData));

      // Display new photo immediately
      currentProfilePhoto.src = base64Image;
    };
    reader.readAsDataURL(file);
  }
});

   function loadProfilePhoto() {
  const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
const fallback = "https://raw.githubusercontent.com/RosarioEspadera/OrderCafe/main/public/styles/images/bg.png";


  currentProfilePhoto.src = userData?.profilePhoto || fallback;
  currentProfilePhoto.classList.remove("hidden");
  currentProfilePhoto.classList.add("visible");
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
    profileOverlay.style.display = "block";

console.log("Overlay display style:", profileOverlay.style.display);
console.log("Overlay classes:", profileOverlay.className);

    loadProfilePhoto();
    
  document.body.classList.remove("readOnlyProfile");
  // Re-enable profile, so clear guest flag
  localStorage.removeItem("isLoggedOut");
    if (guestBanner) guestBanner.classList.add("hidden");
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
  
