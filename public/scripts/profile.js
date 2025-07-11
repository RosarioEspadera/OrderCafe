document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Profile script active");

  // 🔧 Element references
  const profileBtn = document.getElementById("profileBtn");
  const profileOverlay = document.getElementById("profileOverlay");
  const closeProfile = document.getElementById("closeProfile");
  const profileName = document.getElementById("profileName");
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  const currentProfilePhoto = document.getElementById("currentProfilePhoto");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const fullSizePhoto = document.getElementById("fullSizePhoto");
  const closePhotoPreview = document.getElementById("closePhotoPreview");
  const guestBanner = document.getElementById("guestBanner");
  const signInModal = document.getElementById("signInModal");
  const mainContent = document.getElementById("mainContent");
  const usernameField = document.getElementById("signInUsername");
  const signInForm = document.getElementById("signInForm");
  const fallback = "https://raw.githubusercontent.com/RosarioEspadera/OrderCafe/main/public/styles/images/bg.png";

  // 🗄️ Load stored user
  const rawUser = localStorage.getItem("orderCafeUser");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLoggedOut = localStorage.getItem("isLoggedOut") === "true";

  // ✨ UI Helpers
  function updateUI(userData) {
    profileOverlay.classList.remove("hidden");
    profileOverlay.classList.add("visible");
    profileOverlay.style.display = "block";
    mainContent?.classList.remove("hidden");
    signInModal?.classList.add("hidden");
    signInModal?.style.display = "none";

    profileName.textContent = userData.username || "Guest";
    currentProfilePhoto.src = userData.profilePhoto || fallback;
    currentProfilePhoto.classList.remove("hidden");
    currentProfilePhoto.classList.add("visible");

    guestBanner?.classList.add("hidden");

    const orderImages = document.getElementById("orderImages");
    if (orderImages) {
      try {
        orderImages.innerHTML = generateOrderGallery(userData.orders);
      } catch (error) {
        console.error("🧨 Failed to generate gallery:", error);
        orderImages.innerHTML = "<p>Unable to load your orders at the moment.</p>";
      }
    }
  }

  function generateOrderGallery(orders = []) {
    if (!orders.length) return "<p>No recent orders found ☕</p>";

    return orders.map(order => `
      <div class="gallery-item">
        <img src="${order.image}" alt="${order.name}" />
        <p>${order.name} - $${order.price}</p>
      </div>
    `).join("");
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // 🚪 Auto-login
  if (user && !isLoggedOut) updateUI(user);
  if (guestBanner && isLoggedOut) guestBanner.classList.remove("hidden");

  // 🧑‍💻 Manual sign-in simulation
  signInForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredUsername = usernameField?.value.trim();
    if (!enteredUsername) return alert("Please enter a username.");

    const mockUser = {
      username: enteredUsername,
      profilePhoto: fallback,
      orders: [
        { name: "Espresso", image: "images/espresso.jpg", price: 3.5 },
        { name: "Latte", image: "images/latte.jpg", price: 4.25 },
      ],
    };

    localStorage.setItem("orderCafeUser", JSON.stringify(mockUser));
    localStorage.setItem("isLoggedOut", "false");
    updateUI(mockUser);
  });

  // 🔒 Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    localStorage.setItem("isLoggedOut", "true");

    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");
    profileOverlay.style.display = "none";

    profileName.textContent = "Guest";
    currentProfilePhoto.src = fallback;
    currentProfilePhoto.classList.remove("visible");
    currentProfilePhoto.classList.add("hidden");

    mainContent?.classList.add("hidden");
    mainContent?.style.display = "none";

    signInModal?.classList.remove("hidden");
    signInModal?.style.display = "block";
    usernameField?.focus();

    guestBanner?.classList.remove("hidden");
  });

  // 🖼️ Preview photo
  currentProfilePhoto?.addEventListener("click", () => {
    const src = currentProfilePhoto.src;
    if (!src || src === fallback || src === window.location.href) return;

    fullSizePhoto.src = src;
    photoPreviewOverlay?.classList.remove("hidden");
  });

  closePhotoPreview?.addEventListener("click", () => {
    photoPreviewOverlay?.classList.add("hidden");
  });

  // 📷 Upload photo
  profilePhotoUpload?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      const currentData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
      currentData.profilePhoto = base64Image;

      localStorage.setItem("orderCafeUser", JSON.stringify(currentData));
      currentProfilePhoto.src = base64Image;
      showToast("Profile photo updated!");
    };
    reader.readAsDataURL(file);
  });

  // 🎯 Profile button toggle
  profileBtn?.addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("orderCafeUser")) || {};
    updateUI(userData);
  });

  // ❎ Close overlay
  closeProfile?.addEventListener("click", () => {
    profileOverlay.classList.remove("visible");
    profileOverlay.classList.add("hidden");
    profileOverlay.style.display = "none";
  });
});
