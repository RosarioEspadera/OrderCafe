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
  const guestBanner = document.getElementById("guestBanner");
  const signInModal = document.getElementById("signInModal");
  const mainContent = document.getElementById("mainContent");
  const usernameField = document.getElementById("signInUsername"); // optional input for auto-focus

  const fallback = "https://raw.githubusercontent.com/RosarioEspadera/OrderCafe/main/public/styles/images/bg.png";
  const rawUser = localStorage.getItem("orderCafeUser");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";

  // 🟢 Auto-login and profile setup
  if (user) {
    profileOverlay.style.display = "block";
    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");
    mainContent?.classList.remove("hidden");
    mainContent?.style.display = "block";

    const usernameDisplay = document.getElementById("usernameDisplay");
    if (usernameDisplay) {
      usernameDisplay.textContent = user.username || "Guest";
    }

    if (currentProfilePhoto) {
      currentProfilePhoto.src = user.profilePhoto || fallback;
      currentProfilePhoto.classList.remove("hidden");
      currentProfilePhoto.classList.add("visible");
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

  // 🔴 Logout and reset UI
  logoutFromProfile?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    localStorage.removeItem("isLoggedOut");

    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");

    profileName.textContent = "Guest";
    currentProfilePhoto.src = fallback;
    currentProfilePhoto.classList.remove("visible");

    mainContent?.classList.add("hidden");
    mainContent?.style.display = "none";

    if (signInModal) {
      signInModal.style.display = "block";
      signInModal.classList.remove("hidden");
      signInModal.classList.add("visible");
      usernameField?.focus(); // optional auto-focus
    }

    guestBanner?.classList.add("hidden");
  });

  // 📸 Preview full-size profile photo
  currentProfilePhoto?.addEventListener("click", () => {
    const src = currentProfilePhoto.src;
    if (!src || src === fallback || src === window.location.href) return;

    fullSizePhoto.src = src;
    photoPreviewOverlay?.classList.remove("hidden");
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay?.classList.add("hidden");
  });

  // 🖼️ Upload and save profile photo
  profilePhotoUpload?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      let userData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
      userData.profilePhoto = base64Image;
      localStorage.setItem("orderCafeUser", JSON.stringify(userData));
      currentProfilePhoto.src = base64Image;
      showToast("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  });

  // 🧁 Toast confirmation
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // 🖼️ Load profile photo from localStorage
  function loadProfilePhoto() {
    const userData = JSON.parse(localStorage.getItem("orderCafeUser"));
    currentProfilePhoto.src = userData?.profilePhoto || fallback;
    currentProfilePhoto.classList.remove("hidden");
    currentProfilePhoto.classList.add("visible");
  }

  // 📷 Build order gallery
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

  // ☕ Profile button activates overlay
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
      mainContent?.classList.remove("hidden");
      mainContent?.style.display = "block";

      document.body.classList.remove("readOnlyProfile");
      localStorage.removeItem("isLoggedOut");
      guestBanner?.classList.add("hidden");

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

  // ❎ Close profile overlay
  closeProfile?.addEventListener("click", () => {
    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");
  });
});

