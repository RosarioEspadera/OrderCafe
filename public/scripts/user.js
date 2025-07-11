export function getUserData() {
  try {
    const raw = localStorage.getItem("orderCafeUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
