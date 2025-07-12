// 🌟 Profile Modal Logic
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

  // 🎉 Display profile info in modal
  function showProfileModal() {
    currentPhoto.src = user?.profilePhoto || fallbackPhoto;
    profileName.textContent = user?.username || "Guest";
    profileOverlay.classList.remove("hidden");
    profileOverlay.showModal();
    backdrop?.classList.remove("hidden");
  }

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
    profileOverlay.close();
    profileOverlay.classList.add("hidden");
    backdrop?.classList.add("hidden");

    // Reset visual profile details
    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;

    // Return to sign-in
    document.getElementById("mainContent")?.classList.add("hidden");
    document.getElementById("greetingBanner")?.classList.add("hidden");
    document.getElementById("guestBanner")?.classList.remove("hidden");
    document.getElementById("signInModal")?.showModal();
  });

  // ❌ Close modal
  closeBtn?.addEventListener("click", () => {
    profileOverlay.close();
    profileOverlay.classList.add("hidden");
    backdrop?.classList.add("hidden");

    // Return to home screen
    document.getElementById("mainContent")?.classList.remove("hidden");
    document.getElementById("homeTab")?.classList.add("active");
  });

  // ☕ Show profile only when triggered manually
  // If needed, you can export showProfileModal for tab click logic
});


