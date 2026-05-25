import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";
import { superscript } from "./countingElementCart.mjs";

function cartItemTemplate(item) {
    return `<li class='cart-card divider'>
  <span class='cart-card__remove' data-id='${item.Id}'>X</span>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Images.PrimaryMedium}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: ${item.quantity || 1}</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
    }

    init() {
        this.renderCartContents();
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];

        this.parentElement.innerHTML = "";

        if (cartItems.length > 0) {
            renderListWithTemplate(cartItemTemplate, this.parentElement, cartItems);

            const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice * (item.quantity || 1)), 0);

            const footerElement = document.querySelector(".cart-footer");
            if (footerElement) {
                footerElement.classList.remove("hide");
            }

            const totalElement = document.querySelector(".cart-total");
            if (totalElement) {
                totalElement.textContent = `Total: $${total.toFixed(2)}`;
            }

            const removeButtons = this.parentElement.querySelectorAll(".cart-card__remove");
            removeButtons.forEach((button) => {
                button.addEventListener("click", (e) => this.removeFromCart(e));
            });
        } else {
            const footerElement = document.querySelector(".cart-footer");
            if (footerElement) {
                footerElement.classList.add("hide");
            }
        }
    }

    removeFromCart(e) {
        const idToRemove = e.target.dataset.id;
        const cartItems = getLocalStorage(this.key) || [];

        const itemIndex = cartItems.findIndex((item) => item.Id === idToRemove);

        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            setLocalStorage(this.key, cartItems);
            this.renderCartContents();
        }
        superscript();
    }
}