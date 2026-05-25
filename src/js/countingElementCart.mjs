import { getLocalStorage } from "./utils.mjs";

export function superscript() {
    const cart = document.querySelector(".cart");

    if (!cart) {
        console.warn("Cart element not found");
        return;
    }

    // Remove existing superscript to avoid duplicates
    const existing = cart.querySelector(".superscript");
    if (existing) existing.remove();

    const superscriptEl = document.createElement("span");
    superscriptEl.setAttribute("class", "superscript");

    const cartItems = getLocalStorage('so-cart');

    if (cartItems && cartItems.length > 0) {
        const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        superscriptEl.textContent = totalCount;
    } else {
        superscriptEl.textContent = "0";
    }

    cart.appendChild(superscriptEl);
}