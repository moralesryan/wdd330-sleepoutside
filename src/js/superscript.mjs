
import { getLocalStorage } from "./utils.mjs";

export function superscript() {
    const superscript = document.createElement("span");
    superscript.setAttribute("class", "superscript");
    const cart = document.querySelector(".cart");
    // get number of items in cart from localStorage
    const count = getLocalStorage('so-cart');
    // if there are items in cart, add the count to the superscript
    if (count) {
        superscript.textContent = count.length;
    }
    // else add a 0 to the superscript
    else {
        superscript.textContent = "0";
    }
    cart.appendChild(superscript);
}