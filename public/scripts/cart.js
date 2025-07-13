export let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

export const saveCart = () => {
  localStorage.setItem("orderCafeCart", JSON.stringify(cart));
};

export const renderCartItems = () => {
  // same rendering logic here, excluding DOMContentLoaded wrapper
};
