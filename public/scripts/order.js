const cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

function renderCartItems() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span class="price">$${item.price.toFixed(2)}</span>
      <button class="remove-item">✕</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
}
