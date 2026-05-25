import { superscript } from './countingElementCart.mjs';
import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

await loadHeaderFooter();

const cartElement = document.querySelector('.product-list');
const cart = new ShoppingCart('so-cart', cartElement);
cart.init();

superscript();
