document.addEventListener("DOMContentLoaded", () => {
  // 🔗 DOM Elements
  const $ = (id) => document.getElementById(id);
  const userModal = $("userModal");
  const userForm = $("userForm");
  const avatarUpload = $("avatarUpload");
  const profilePhotoURL = $("profilePhoto");
  const previewImg = $("preview");
  const currentAvatar = $("currentAvatar");
  const userName = $("userNameInput");
  const userEmail = $("email");
  const userAddress = $("address");
  const userFeedback = $("userFeedback");
  const logoutBtn = $("logoutFromProfile");
  const closeBtn = $("closeProfile");

  const greetingBanner = $("greetingBanner");
  const guestBanner = $("guestBanner");
  const mainContent = $("mainContent");
  const backdrop = document.querySelector(".modal-backdrop");
  const accountTab = $("accountTab");

  const fallbackPhoto = "styles/images/bg.png";
  let user = JSON.parse(localStorage.getItem("orderCafeUser")) || null;

  // 🧼 Modal Reset on Load
  userModal?.classList.add("hidden");
  userModal?.close?.();
  backdrop?.classList.add("hidden");

  // 👤 AccountTab Activation
  accountTab?.addEventListener("click", () => {
    if (!user || user.username === "Guest") {
      userName.value = "";
      userEmail.value = "";
      userAddress.value = "";
      currentAvatar.src = fallbackPhoto;
    } else {
      userName.value = user.username || "";
      userEmail.value = user.email || "";
      userAddress.value = user.address || "";
      currentAvatar.src = user.profilePhoto || fallbackPhoto;
    }

    userModal.classList.remove("hidden");
    userModal.showModal?.();
    backdrop?.classList.remove("hidden");
  });

 // 📷 Preview and store uploaded avatar file
avatarUpload?.addEventListener("change", () => {
  const file = avatarUpload.files[0];
  if (file?.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const photo = e.target.result;
      currentAvatar.src = photo;       // ✅ update main avatar
      previewImg.src = photo;          // update preview (optional)
      if (user) {
        user.profilePhoto = photo;
        localStorage.setItem("orderCafeUser", JSON.stringify(user));
      }
    };
    reader.readAsDataURL(file);
  }
});

// 🔗 Live preview from pasted URL and update avatar
profilePhotoURL?.addEventListener("input", () => {
  const url = profilePhotoURL.value;
  previewImg.src = url;
  currentAvatar.src = url;             // ✅ update main avatar too
  if (user) {
    user.profilePhoto = url;
    localStorage.setItem("orderCafeUser", JSON.stringify(user));
  }
});

  // 💾 Save Account Info
  userForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = userName.value.trim();
    const email = userEmail.value.trim();
    const address = userAddress.value.trim();
    const profilePhoto = currentAvatar.src || fallbackPhoto;

    if (!username || !email.includes("@") || !address) {
      userFeedback.textContent = "❌ Please enter name, email, and address.";
      userFeedback.classList.remove("hidden");
      return;
    }

    user = { username, email, address, profilePhoto };
    localStorage.setItem("orderCafeUser", JSON.stringify(user));

    userFeedback.textContent = "✅ Credentials saved!";
    userFeedback.classList.remove("hidden");

    setTimeout(() => {
      userModal?.close();
      userModal?.classList.add("hidden");
      backdrop?.classList.add("hidden");
      greetingBanner?.classList.remove("hidden");
      guestBanner?.classList.add("hidden");
    }, 1200);
  });

  // 🔓 Logout Flow
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("orderCafeUser");
    greetingBanner?.classList.add("hidden");
    guestBanner?.classList.remove("hidden");

    userModal?.close();
    userModal?.classList.add("hidden");
    backdrop?.classList.add("hidden");

    $("signInModal")?.showModal();
    $("homeTab")?.classList.add("active");
    $("orderTab")?.classList.remove("active");
    $("accountTab")?.classList.remove("active");
  });

  // ❌ Close Modal
  closeBtn?.addEventListener("click", () => {
    userModal?.close();
    userModal?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");

    $("homeTab")?.classList.add("active");
    $("accountTab")?.classList.remove("active");
  });
});

