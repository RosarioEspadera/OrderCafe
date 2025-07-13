// account.js
document.addEventListener("DOMContentLoaded", () => {
  const userModal = document.getElementById("userModal");
  const userForm = document.getElementById("userForm");
  const currentAvatar = document.getElementById("currentAvatar");
  const avatarUpload = document.getElementById("avatarUpload");
  const userNameInput = document.getElementById("userNameInput");
  const emailInput = document.getElementById("email");
  const userFeedback = document.getElementById("userFeedback");
  const logoutBtn = document.getElementById("logoutFromProfile");
  const closeBtn = document.getElementById("closeProfile");
  const backdrop = document.querySelector(".modal-backdrop");
  const addressInput = document.getElementById("address");
  const previewURL = document.getElementById("profilePhoto");
  const previewImg = document.getElementById("preview");

  const greetingBanner = document.getElementById("greetingBanner");
  const guestBanner = document.getElementById("guestBanner");
  const mainContent = document.getElementById("mainContent");
  const fallbackPhoto = "styles/images/bg.png";

  let user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;

  // 🧼 Hide modal on startup
  userModal?.classList.add("hidden");
  userModal?.close?.();
  backdrop?.classList.add("hidden");

  // 🧑 Open Account Modal
 document.getElementById("accountTab")?.addEventListener("click", () => {
  if (!user || user.username === "Guest") {
    userNameInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    currentAvatar.src = fallbackPhoto;
  } else {
    userNameInput.value = user.username || "";
    emailInput.value = user.email || "";
    addressInput.value = user.address || "";
    currentAvatar.src = user.profilePhoto || fallbackPhoto;
  }

  userModal.classList.remove("hidden");
  userModal.showModal?.();
  backdrop?.classList.remove("hidden");
});


  // 📷 Handle avatar upload
  avatarUpload?.addEventListener("change", () => {
    const file = avatarUpload.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photo = e.target.result;
        currentAvatar.src = photo;
        if (user) {
          user.profilePhoto = photo;
          localStorage.setItem("orderCafeUser", JSON.stringify(user));
        }
      };
      reader.readAsDataURL(file);
    }
  });
// 🔄 Preview from pasted URL
previewURL.addEventListener("input", () => {
  previewImg.src = previewURL.value;
});
  // 📝 Save credentials
 userForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = userNameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();
  const profilePhoto = currentAvatar.src || fallbackPhoto;

  if (!username || !email || !email.includes("@") || !address) {
  userFeedback.textContent = "❌ Please enter name, email, and address.";
  userFeedback.classList.remove("hidden");
  return;
}

user = { username, email, address, profilePhoto };
localStorage.setItem("orderCafeUser", JSON.stringify(user));

  userFeedback.textContent = "✅ Credentials saved!";
  userFeedback.classList.remove("hidden");

  setTimeout(() => {
    userModal.close?.();
    userModal.classList.add("hidden");
    backdrop?.classList.add("hidden");
    greetingBanner?.classList.remove("hidden");
    guestBanner?.classList.add("hidden");
  }, 1200);
});


  // 🔓 Logout
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    greetingBanner?.classList.add("hidden");
    guestBanner?.classList.remove("hidden");

    userModal?.close();
    userModal?.classList.add("hidden");
    backdrop?.classList.add("hidden");

    document.getElementById("signInModal")?.showModal();
    document.getElementById("homeTab")?.classList.add("active");
    document.getElementById("orderTab")?.classList.remove("active");
    document.getElementById("accountTab")?.classList.remove("active");
  });

  // ❌ Close modal
  closeBtn?.addEventListener("click", () => {
    userModal?.close();
    userModal?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");

    document.getElementById("homeTab")?.classList.add("active");
    document.getElementById("accountTab")?.classList.remove("active");
  });
});
