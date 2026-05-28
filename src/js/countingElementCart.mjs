import { getLocalStorage } from "./utils.mjs";

export function superscript() {
  const cart = document.querySelector(".cart");

  if (!cart) return; // safety check (prevents Render crash)

  // Remove old badge if it already exists
  const existing = cart.querySelector(".superscript");
  if (existing) {
    existing.remove();
  }

  // Get cart items from localStorage
  const count = getLocalStorage("so-cart") || [];

  // Create badge
  const badge = document.createElement("span");
  badge.className = "superscript";
  badge.textContent = count.length;

  // Attach badge to cart icon
  cart.appendChild(badge);
}