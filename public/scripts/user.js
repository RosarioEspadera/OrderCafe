export function clearUserData() {
  localStorage.removeItem("orderCafeUser");
}

export function saveUserData(user) {
  try {
    localStorage.setItem("orderCafeUser", JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save user data ☁️", err);
  }
}
