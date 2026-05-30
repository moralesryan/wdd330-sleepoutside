import { loadHeaderFooter } from "./utils.mjs";
import { loadBreadcrumb } from "./Breadcrumb.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
const order = new CheckoutProcess("so-cart", "#order-summary");
loadHeaderFooter();
loadBreadcrumb();
order.init();

document.querySelector("#zip").addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    console.log(order)
    order.checkout();
});
