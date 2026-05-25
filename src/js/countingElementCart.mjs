import { getLocalStorage } from "./utils.mjs";

export function superscript() {

    // Find cart element
    const cart = document.querySelector(".cart");

    // Stop if cart does not exist
    if (!cart) return;

    // Get cart items
    const count = getLocalStorage("so-cart") || [];

    // Check if superscript already exists
    let badge = cart.querySelector(".superscript");

    // Create it if missing
    if (!badge) {
        badge = document.createElement("span");
        badge.classList.add("superscript");
        cart.appendChild(badge);
    }

    // Update count
    badge.textContent = count.length;
}