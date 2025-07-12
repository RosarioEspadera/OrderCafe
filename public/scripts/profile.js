document.addEventListener("DOMContentLoaded", () => {
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentPhoto = document.getElementById("currentProfilePhoto");
  const photoUploadInput = document.getElementById("profilePhotoUpload");
  const closeBtn = document.getElementById("closeProfile");
  const backdrop = document.querySelector(".modal-backdrop");

  const photoPreviewOverlay = document.getElementById("photoPreviewOverlay");
  const closePhotoPreviewBtn = document.getElementById("closePhotoPreview");

  const fallbackPhoto = "styles/images/bg.png";
  let user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;

  function loadProfile() {
    currentPhoto.src = user?.profilePhoto || fallbackPhoto;
    profileName.textContent = user?.username || "Guest";

    profileOverlay.classList.remove("hidden");
    profileOverlay.showModal();
    backdrop?.classList.remove("hidden");
  }

  photoUploadInput?.addEventListener("change", () => {
    const file = photoUploadInput.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        user.profilePhoto = e.target.result;
        currentPhoto.src = user.profilePhoto;
        localStorage.setItem("orderCafeUser", JSON.stringify(user));
      };
      reader.readAsDataURL(file);
    }
  });

  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    profileOverlay.close();
    profileOverlay.classList.add("hidden");
    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;
    backdrop?.classList.add("hidden");
    document.getElementById("signInModal")?.showModal();
  });

  closeBtn?.addEventListener("click", () => {
    profileOverlay.close();
    profileOverlay.classList.add("hidden");
    backdrop?.classList.add("hidden");
  });

  closePhotoPreviewBtn?.addEventListener("click", () => {
    photoPreviewOverlay?.classList.add("hidden");
  });

  loadProfile();
});

