document.addEventListener("DOMContentLoaded", () => {
  const profileOverlay = document.getElementById("profileOverlay");
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const currentPhoto = document.getElementById("currentProfilePhoto");
  const photoUploadInput = document.getElementById("profilePhotoUpload");

  let user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;
  const fallbackPhoto = "styles/images/bg.png";

  function loadProfile() {
    if (user?.username) {
      profileName.textContent = user.username;
      currentPhoto.src = user.profilePhoto || fallbackPhoto;
      profileOverlay.showModal();
    } else {
      currentPhoto.src = fallbackPhoto;
      profileName.textContent = "Guest";
    }
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
    profileName.textContent = "Guest";
    currentPhoto.src = fallbackPhoto;
    document.getElementById("signInModal")?.showModal();
  });

  loadProfile();
});

