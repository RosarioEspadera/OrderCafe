document.addEventListener("DOMContentLoaded", () => {
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentPhoto = document.getElementById("currentProfilePhoto");
  const photoUploadInput = document.getElementById("profilePhotoUpload");
  const closeBtn = document.getElementById("closeProfile");
  const backdrop = document.querySelector(".modal-backdrop");
  const fallbackPhoto = "styles/images/bg.png";

  let user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;

  // 🧼 Ensure profileOverlay stays hidden at startup
  profileOverlay?.classList.add("hidden");
  profileOverlay?.close();
  backdrop?.classList.add("hidden");

  // 🎉 Display user info when profile modal is triggered
 function showProfileModal() {
  const freshUser = JSON.parse(localStorage.getItem("orderCafeUser"));

  if (!freshUser || typeof freshUser.username !== "string" || !freshUser.username.trim()) {
    showToast("Please sign in to view your profile ☕");
    return;
  }

  currentPhoto.src = freshUser.profilePhoto || fallbackPhoto;
  profileName.textContent = freshUser.username;
  profileOverlay.classList.remove("hidden");
  profileOverlay.showModal();
  backdrop?.classList.remove("hidden");
}


  // ✨ Export function for topmodal.js or tab clicks
  window.showProfileModal = showProfileModal;

  // 📸 Handle profile photo upload
  photoUploadInput?.addEventListener("change", () => {
    const file = photoUploadInput.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        user.profilePhoto = e.target.result;
        currentPhoto.src = user.profilePhoto;
        localStorage.setItem("orderCafeUser", JSON.stringify(user));
      };
      reader.readAsDataURL(file);
    }
  });

  // 🔓 Log out and reset profile
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");

    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;

    // Show sign-in modal again
    document.getElementById("mainContent")?.classList.add("hidden");
    document.getElementById("greetingBanner")?.classList.add("hidden");
    document.getElementById("guestBanner")?.classList.remove("hidden");
    document.getElementById("signInModal")?.showModal();

    // Optionally reset active tab
    document.getElementById("homeTab")?.classList.add("active");
    document.getElementById("orderTab")?.classList.remove("active");
    document.getElementById("profileTab")?.classList.remove("active");
  });

  // ❌ Close profile modal
  closeBtn?.addEventListener("click", () => {
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");

    document.getElementById("mainContent")?.classList.remove("hidden");

    // Activate Home tab
    document.getElementById("homeTab")?.classList.add("active");
    document.getElementById("orderTab")?.classList.remove("active");
    document.getElementById("profileTab")?.classList.remove("active");
  });
});
