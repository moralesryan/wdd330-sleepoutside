import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // click event listener to each X button
  const removeButtons = document.querySelectorAll(".cart-card__remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(e) {
  const idToRemove = e.target.dataset.id;
  const cartItems = getLocalStorage("so-cart") || [];

  // Remove the item from the array
  const itemIndex = cartItems.findIndex((item) => item.Id === idToRemove);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    // Save updated cart to localStorage
    setLocalStorage("so-cart", cartItems);
    // Re-render cart
    renderCartContents();
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <span class='cart-card__remove' data-id='${item.Id}'>X</span>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
